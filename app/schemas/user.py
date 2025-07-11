# app/schemas/user.py
from pydantic import BaseModel, EmailStr, Field
from app.models.user import UserRole, UserStatus


class UserBase(BaseModel):
    email: EmailStr
    nome_completo: str
    telefone: str | None = None


class UserCreate(UserBase):
    password: str = Field(..., min_length=8)
    role: UserRole = UserRole.CLIENTE

class User(UserBase):
    id: int
    role: UserRole
    status: UserStatus 

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    """Schema para a atualização de dados do perfil. Campos opcionais."""
    email: EmailStr | None = None
    nome_completo: str | None = None
    telefone: str | None = None


class UserPasswordUpdate(BaseModel):
    """Schema para a atualização de senha do usuário."""
    current_password: str = Field(..., min_length=8)
    new_password: str = Field(..., min_length=8)
    confirm_new_password: str = Field(..., min_length=8)