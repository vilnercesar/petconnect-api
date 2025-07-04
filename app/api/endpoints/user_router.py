# app/api/endpoints/user_router.py

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User as UserModel, UserRole, UserStatus
from app.schemas.user import User as UserSchema, UserCreate
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