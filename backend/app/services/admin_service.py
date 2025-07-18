from sqlalchemy.orm import Session
from app.models.user import User, UserStatus
from app.models.service_request import ServiceRequest, RequestStatusEnum

def get_system_stats(db: Session):
    total_users = db.query(User).count()
    pending_users = db.query(User).filter(User.status == UserStatus.PENDENTE).count()

    active_services = db.query(ServiceRequest).filter(
        ServiceRequest.status.in_([RequestStatusEnum.ACEITO, RequestStatusEnum.EM_ANDAMENTO])
    ).count()

    return {
        "total_users": total_users,
        "pending_users": pending_users,
        "active_services": active_services,
    }