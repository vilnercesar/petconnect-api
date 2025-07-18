# tests/test_admin.py
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session


from app.services import user_services as user_service 
from app.models.user import UserRole, UserStatus
from app.schemas.user import UserCreate




def create_admin_and_get_token(client: TestClient, db: Session) -> str:
    """
    Cria um usuário admin diretamente no banco de teste, ativa-o,
    e depois usa a API para fazer login e retornar seu token.
    """
    admin_data = UserCreate(
        email="admin.test@example.com",
        nome_completo="Admin Test User",
        password="a-strong-password-for-admin",
        role=UserRole.ADMIN
    )
    
    user = user_service.create_user(db=db, user=admin_data)
    user.status = UserStatus.ATIVO
    db.commit()
    db.refresh(user)

    login_response = client.post(
        "/auth/token",
        data={"username": admin_data.email, "password": admin_data.password},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert login_response.status_code == 200, login_response.text
    return login_response.json()["access_token"]





def test_list_all_users_as_admin(client: TestClient, db_session: Session):
    """
    Testa se um admin consegue listar todos os usuários do sistema.
    """
   
    admin_token = create_admin_and_get_token(client, db_session)
    
    client.post("/users/", json={"email": "client.test@example.com", "nome_completo": "Client Test", "password": "password123"})

    response = client.get(
        "/users/",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2
    assert "admin.test@example.com" in [user["email"] for user in data]


def test_list_all_users_as_non_admin_fails(client: TestClient):
    """
    Testa se um usuário comum (cliente) não consegue listar todos os usuários.
    """
    client.post("/users/", json={"email": "client.test2@example.com", "nome_completo": "Client Test 2", "password": "password123"})
    login_response = client.post("/auth/token", data={"username": "client.test2@example.com", "password": "password123"}, headers={"Content-Type": "application/x-www-form-urlencoded"})
    client_token = login_response.json()["access_token"]

    response = client.get("/users/", headers={"Authorization": f"Bearer {client_token}"})

    assert response.status_code == 403
    assert "Apenas administradores" in response.json()["detail"]



def test_approve_user_as_admin(client: TestClient, db_session: Session):
    """
    Testa se um admin consegue aprovar um usuário pendente.
    """
    admin_token = create_admin_and_get_token(client, db_session)

    client_response = client.post("/users/", json={"email": "pending.user@example.com", "nome_completo": "Pending User", "password": "password123"})
    pending_user_data = client_response.json()
    pending_user_id = pending_user_data["id"]

    response = client.patch(
        f"/users/{pending_user_id}/approve",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert response.status_code == 200
    assert response.json()["status"] == "ativo"