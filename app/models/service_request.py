# app/models/service_request.py

import enum
from sqlalchemy import Column, Integer, ForeignKey, Enum as SAEnum, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class ServiceTypeEnum(str, enum.Enum):
    PET_SITTER = "pet_sitter"
    HOSPEDAGEM = "hospedagem"
    PASSEIO = "passeio"
    PET_SHOP = "pet_shop"
    CRECHE = "creche"

class RequestStatusEnum(str, enum.Enum):
    PENDENTE = "pendente"
    ACEITO = "aceito"
    RECUSADO = "recusado"
    EM_ANDAMENTO = "em_andamento"
    CONCLUIDO = "concluido"
    CANCELADO = "cancelado"

class ServiceRequest(Base):
    __tablename__ = "service_requests"

    id = Column(Integer, primary_key=True, index=True)

    service_type = Column(SAEnum(ServiceTypeEnum), nullable=False)
    status = Column(SAEnum(RequestStatusEnum), nullable=False, default=RequestStatusEnum.PENDENTE)

    # Chaves estrangeiras para conectar com os usuários
    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    collaborator_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    # Timestamps de criação e atualização
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # Relacionamentos para facilitar o acesso aos objetos User
    client = relationship("User", foreign_keys=[client_id], back_populates="sent_requests")
    collaborator = relationship("User", foreign_keys=[collaborator_id], back_populates="received_requests")