# app/schemas/service_request.py

from pydantic import BaseModel
from datetime import datetime
from app.models.service_request import ServiceTypeEnum, RequestStatusEnum
from .user import User  

class ServiceRequestBase(BaseModel):
    service_type: ServiceTypeEnum
    collaborator_id: int

class ServiceRequestCreate(ServiceRequestBase):
    pass

class ServiceRequest(ServiceRequestBase):
    id: int
    status: RequestStatusEnum
    client_id: int
    created_at: datetime

    # Para incluir os dados completos do cliente e colaborador na resposta
    client: User
    collaborator: User

    class Config:
        from_attributes = True