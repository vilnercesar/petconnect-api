# app/api/endpoints/auth_router.py
from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.database import get_db
from app.schemas.token import Token
from app.services import user_services

router = APIRouter()

@router.post("/token", response_model=Token, summary="Gera um token de acesso para o usuário")
def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Session = Depends(get_db)
):
    """
    Endpoint de login. Recebe email (no campo username) e senha.
    Retorna um token de acesso se as credenciais forem válidas.
    """
    user = user_services.get_user_by_email(db, email=form_data.username)
    if not user or not user_services.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = user_services.create_access_token(
        data={"sub": user.email, "role":user.role.value}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}