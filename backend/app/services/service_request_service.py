# app/services/service_request_service.py

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.models.service_request import ServiceRequest as ServiceRequestModel, RequestStatusEnum
from app.models.user import User as UserModel, UserRole, UserStatus
from app.schemas.service_request import ServiceRequestCreate


def create_service_request(db: Session, request_in: ServiceRequestCreate, client_id: int) -> ServiceRequestModel:
    """
    Cria uma nova solicitação de serviço, validando se o colaborador existe,
    é válido e está ativo.
    """
    collaborator = db.query(UserModel).filter(UserModel.id == request_in.collaborator_id).first()

    if not collaborator:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Colaborador com o ID {request_in.collaborator_id} não encontrado.")
    if collaborator.role != UserRole.COLABORADOR:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="O ID fornecido não pertence a um colaborador válido.")
    if collaborator.status != UserStatus.ATIVO:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Este colaborador não está ativo no momento e não pode receber solicitações.")

    db_request = ServiceRequestModel(**request_in.model_dump(), client_id=client_id)
    db.add(db_request)
    db.commit()
    db.refresh(db_request)
    return db_request

def get_requests_for_collaborator(db: Session, collaborator_id: int) -> list[ServiceRequestModel]:
    """Busca todas as solicitações destinadas a um colaborador específico."""
    return db.query(ServiceRequestModel).filter(ServiceRequestModel.collaborator_id == collaborator_id).all()

def get_request_by_id(db: Session, request_id: int) -> ServiceRequestModel | None:
    """Busca uma solicitação específica pelo seu ID."""
    return db.query(ServiceRequestModel).filter(ServiceRequestModel.id == request_id).first()

def update_request_status(db: Session, db_request: ServiceRequestModel, new_status: RequestStatusEnum) -> ServiceRequestModel:
    """Atualiza o status de uma solicitação de serviço."""
    db_request.status = new_status
    db.commit()
    db.refresh(db_request)
    return db_request

def get_requests_by_client(db: Session, client_id: int) -> list[ServiceRequestModel]:
    """Busca todas as solicitações feitas por um cliente específico."""
    # Ordenamos pelas mais recentes primeiro
    return db.query(ServiceRequestModel).filter(ServiceRequestModel.client_id == client_id).order_by(ServiceRequestModel.created_at.desc()).all()