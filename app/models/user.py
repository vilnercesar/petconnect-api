# app/models/user.py
import enum
from sqlalchemy import Boolean, Column, Integer, String, Enum as SAEnum
from ..core.database import Base

class UserRole(str, enum.Enum):
    CLIENTE = "cliente"
    COLABORADOR = "colaborador"
    ADMIN = "admin"


class UserStatus(str, enum.Enum):
    PENDENTE = "pendente"
    ATIVO = "ativo"
    INATIVO = "inativo"
    REJEITADO = "rejeitado"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    nome_completo = Column(String, nullable=False)
    telefone = Column(String)
    hashed_password = Column(String, nullable=False)
    role = Column(SAEnum(UserRole), nullable=False, default=UserRole.CLIENTE)
    status = Column(SAEnum(UserStatus), nullable=False, default=UserStatus.PENDENTE)