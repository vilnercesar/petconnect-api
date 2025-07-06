# app/api/endpoints/admin_router.py

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User as UserModel, UserStatus
from app.schemas.user import User as UserSchema
from app.services import user_services

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
