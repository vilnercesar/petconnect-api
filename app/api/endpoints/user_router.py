# app/api/endpoints/user_router.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import User, UserCreate
from app.services import user_services

from typing import Annotated
from app.schemas.user import User, UserCreate
from app.services import user_services

router = APIRouter()

@router.post("/", response_model=User, status_code=status.HTTP_201_CREATED, summary="Cria um novo usuário")
def create_user_endpoint(user: UserCreate, db: Session = Depends(get_db)):
    """
    Cria um novo usuário no sistema.

    - **email**: O email do usuário (deve ser único).
    - **nome_completo**: O nome completo do usuário.
    - **password**: A senha do usuário.
    - **telefone**: O telefone do usuário (opcional).
    - **role**: O papel do usuário (`cliente`, `colaborador`, `admin`). Padrão: `cliente`.
    """
    db_user = user_services.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email já registrado",
        )
    return user_services.create_user(db=db, user=user)

@router.get("/me", response_model=User, summary="Obtém os dados do usuário autenticado")
def read_users_me(current_user: Annotated[User, Depends(user_services.get_current_user)]):
    """
    Retorna os dados do usuário que está fazendo a requisição (autenticado).
    """
    return current_user