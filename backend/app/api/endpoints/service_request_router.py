# app/api/endpoints/service_request_router.py

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.user import User as UserModel
from app.models.service_request import RequestStatusEnum
from app.schemas.service_request import ServiceRequest, ServiceRequestCreate
from app.services import service_request_service, user_services

router = APIRouter()

@router.post("/", response_model=ServiceRequest, summary="Cria uma nova solicitação de serviço")
def create_request(
    request_in: ServiceRequestCreate,
    db: Session = Depends(get_db),
    # Usamos nossa dependência para garantir que o usuário está logado e ATIVO
    current_user: UserModel = Depends(user_services.require_active_user)
):
    """
    Cria uma nova solicitação de serviço em nome do usuário autenticado.
    O usuário precisa ter o status 'ativo' para usar esta rota.
    """
    return service_request_service.create_service_request(
        db=db, request_in=request_in, client_id=current_user.id
    )


@router.get("/me/requests", response_model=list[ServiceRequest], summary="Lista as solicitações recebidas pelo colaborador")
def get_my_requests(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(user_services.require_collaborator_user)
):
    """
    Retorna uma lista de todas as solicitações de serviço enviadas
    para o colaborador autenticado.
    """
    return service_request_service.get_requests_for_collaborator(db, collaborator_id=current_user.id)


@router.patch("/{request_id}/accept", response_model=ServiceRequest, summary="Aceita uma solicitação de serviço")
def accept_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(user_services.require_collaborator_user)
):
    """
    Altera o status de uma solicitação de serviço para 'aceito'.
    """
    db_request = service_request_service.get_request_by_id(db, request_id=request_id)

    if not db_request or db_request.collaborator_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solicitação de serviço não encontrada ou não pertence a você")

    return service_request_service.update_request_status(db, db_request, new_status=RequestStatusEnum.ACEITO)


@router.patch("/{request_id}/refuse", response_model=ServiceRequest, summary="Recusa uma solicitação de serviço")
def refuse_request(
    request_id: int,
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(user_services.require_collaborator_user)
):
    """
    Altera o status de uma solicitação de serviço para 'recusado'.
    """
    db_request = service_request_service.get_request_by_id(db, request_id=request_id)

    if not db_request or db_request.collaborator_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solicitação de serviço não encontrada ou não pertence a você")

    return service_request_service.update_request_status(db, db_request, new_status=RequestStatusEnum.RECUSADO)


@router.get("/my-requests", response_model=list[ServiceRequest], summary="Lista as solicitações feitas pelo cliente")
def get_my_sent_requests(
    db: Session = Depends(get_db),
    current_user: UserModel = Depends(user_services.require_active_user)
):
    """
    Retorna uma lista de todas as solicitações de serviço feitas
    pelo cliente autenticado.
    """
    return service_request_service.get_requests_by_client(db, client_id=current_user.id)
