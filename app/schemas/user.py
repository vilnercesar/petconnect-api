# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from enum import Enum

class UserRole(str, Enum):
    CLIENTE = "cliente"
    COLABORADOR = "colaborador"
    ADMIN = "admin"

class UserBase(BaseModel):
    email: EmailStr
    nome_completo: str
    telefone: str | None = None

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.CLIENTE

class User(UserBase):
    id: int
    is_active: bool
    role: UserRole

    class Config:
        orm_mode = True