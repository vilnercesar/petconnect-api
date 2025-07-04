# app/schemas/user.py
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole, UserStatus


class UserBase(BaseModel):
    email: EmailStr
    nome_completo: str
    telefone: str | None = None

class UserCreate(UserBase):
    password: str
    role: UserRole = UserRole.CLIENTE

class User(UserBase):
    id: int
    role: UserRole
    status: UserStatus 

    class Config:
        orm_mode = True