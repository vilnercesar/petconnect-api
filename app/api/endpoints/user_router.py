# app/api/endpoints/user_router.py

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status, Response
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User as UserModel, UserRole, UserStatus
from app.schemas.user import User as UserSchema, UserCreate, UserUpdate, UserPasswordUpdate
from app.services import user_services

router = APIRouter()

@router.post("/", response_model=UserSchema, status_code=status.HTTP_201_CREATED, summary="Cria um novo usuário")
def create_user_endpoint(
    user_in: UserCreate,
    db: Session = Depends(get_db),
    current_user: Annotated[UserModel | None, Depends(user_services.get_current_user_or_none)] = None
):
    if user_in.role == UserRole.ADMIN:
        if not current_user or current_user.role != UserRole.ADMIN:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Apenas administradores podem criar outros administradores."
            )

    db_user = user_services.get_user_by_email(db, email=user_in.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já registrado",
        )
    
    new_user = user_services.create_user(db=db, user=user_in)
    
    if new_user.role == UserRole.ADMIN:
        new_user.status = UserStatus.ATIVO
        db.commit()
        db.refresh(new_user)
        
    return new_user

@router.get("/me", response_model=UserSchema, summary="Obtém os dados do usuário autenticado")
def read_users_me(current_user: Annotated[UserModel, Depends(user_services.get_current_user)]):
    return current_user

@router.patch("/me", response_model=UserSchema, summary="Atualiza os dados do usuário autenticado")
def update_user_me(
    user_in: UserUpdate,
    current_user: Annotated[UserModel, Depends(user_services.get_current_user)],
    db: Session = Depends(get_db)
):
    """Atualiza as informações do próprio usuário (nome, email, telefone)."""
    return user_services.update_user(db=db, db_user=current_user, user_in=user_in)


@router.delete("/me", status_code=status.HTTP_204_NO_CONTENT, summary="Deleta o usuário autenticado")
def delete_user_me(
    current_user: Annotated[UserModel, Depends(user_services.get_current_user)],
    db: Session = Depends(get_db)
):
    """Deleta permanentemente a conta do próprio usuário."""
    user_services.delete_user_by_id(db, user_id=current_user.id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.post("/me/change-password", status_code=status.HTTP_204_NO_CONTENT, summary="Altera a senha do usuário autenticado")
def change_password_me(
    passwords: UserPasswordUpdate,
    current_user: Annotated[UserModel, Depends(user_services.get_current_user)],
    db: Session = Depends(get_db)
):
    """Permite que o usuário autenticado altere sua própria senha."""
    if passwords.new_password != passwords.confirm_new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A nova senha e a confirmação não coincidem."
        )
    
    success = user_services.change_user_password(
        db=db,
        db_user=current_user,
        current_password=passwords.current_password,
        new_password=passwords.new_password
    )

    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A senha atual está incorreta."
        )

    return Response(status_code=status.HTTP_204_NO_CONTENT)