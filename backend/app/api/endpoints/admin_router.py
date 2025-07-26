from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Response, Header
from sqlalchemy.orm import Session
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User as UserModel, UserRole, UserStatus
from app.schemas.user import UserCreate, User as UserSchema
from app.services import user_services
from app.schemas.admin import Stats as StatsSchema 
from app.services import admin_service 


router = APIRouter()
@router.get("/", response_model=list[UserSchema], summary="Lista todos os usuários do sistema")

def read_all_users(
    admin_user: Annotated[UserModel, Depends(user_services.require_admin_user)],
    db: Session = Depends(get_db)
):
    """
    Retorna uma lista de todos os usuários cadastrados no sistema.
    Apenas administradores podem acessar esta rota.
    """
    users = user_services.get_all_users(db)
    return users

@router.patch("/{user_id}/approve", response_model=UserSchema, summary="Aprova o cadastro de um usuário")
def approve_user(
    user_id: int,
    admin_user: Annotated[UserModel, Depends(user_services.require_admin_user)],
    db: Session = Depends(get_db)
):
    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    db_user.status = UserStatus.ATIVO
    db.commit()
    db.refresh(db_user)
    return db_user


@router.patch("/{user_id}/reject", response_model=UserSchema, summary="Rejeita ou bane um usuário")
def reject_user(
    user_id: int,
    admin_user: Annotated[UserModel, Depends(user_services.require_admin_user)],
    db: Session = Depends(get_db)
):
    """
    Altera o status de um usuário para 'rejeitado'.
    Pode ser usado para rejeitar um cadastro pendente ou para banir um usuário ativo.
    Apenas administradores podem acessar esta rota.
    """
    if admin_user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Administradores não podem rejeitar a si mesmos."
        )

    db_user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if db_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    
    db_user.status = UserStatus.REJEITADO
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT, summary="Deleta um usuário")
def delete_user(
    user_id: int,
    admin_user: Annotated[UserModel, Depends(user_services.require_admin_user)],
    db: Session = Depends(get_db)
):
    """
    Deleta permanentemente um usuário do sistema.
    Apenas administradores podem acessar esta rota.
    """
    if admin_user.id == user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Administradores não podem deletar a si mesmos."
        )

    deleted_user = user_services.delete_user_by_id(db, user_id=user_id)
    
    if deleted_user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    return Response(status_code=status.HTTP_204_NO_CONTENT)

@router.get("/stats", response_model=StatsSchema, summary="Obtém estatísticas do sistema")
def get_stats(
    db: Session = Depends(get_db),
    admin_user: UserModel = Depends(user_services.require_admin_user),
):
    """
    Retorna estatísticas gerais sobre a plataforma.
    Apenas administradores podem aceder a esta rota.
    """
    return admin_service.get_system_stats(db)

@router.post("/create-first-admin", response_model=UserSchema, summary="Cria o primeiro usuário administrador")
def create_first_admin(
    user_in: UserCreate,
    x_admin_secret: str = Header(...),
    db: Session = Depends(get_db)
):
    """
    Endpoint protegido por um segredo para criar o primeiro admin.
    Este endpoint deve ser usado apenas uma vez e depois idealmente removido.
    """
    # 1. Verifica se a senha mestra está correta
    if x_admin_secret != settings.ADMIN_CREATION_SECRET:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Segredo de administração inválido.")

    # 2. Garante que o usuário a ser criado é um admin
    if user_in.role != UserRole.ADMIN:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Este endpoint só pode criar administradores.")

    # 3. Verifica se já existe algum admin no sistema
    existing_admin = db.query(UserModel).filter(UserModel.role == UserRole.ADMIN).first()
    if existing_admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Um administrador já existe no sistema.")

    # 4. Cria o admin
    new_admin = user_services.create_user(db=db, user=user_in)
    new_admin.status = UserStatus.ATIVO
    db.commit()
    db.refresh(new_admin)
    return new_admin