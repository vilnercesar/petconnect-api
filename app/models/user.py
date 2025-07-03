# app/models/user.py
from sqlalchemy import Boolean, Column, Integer, String, Enum as SAEnum
from ..core.database import Base
from app.schemas.user import UserRole

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    nome_completo = Column(String, nullable=False)
    telefone = Column(String)
    hashed_password = Column(String, nullable=False)
    role = Column(SAEnum(UserRole), nullable=False, default=UserRole.CLIENTE)
    is_active = Column(Boolean, default=True)