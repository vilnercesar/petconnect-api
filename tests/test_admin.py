# tests/test_admin.py

from fastapi.testclient import TestClient



def create_admin_and_get_token(client: TestClient) -> tuple[str, int]:
    """Cria um usuário admin, aprova-o e retorna seu token e ID."""
 

    # 1. Criamos um usuário que será nosso admin
    admin_response = client.post(
        "/users/",
        json={
            "email": "admin.test@example.com",
            "nome_completo": "Admin Test User",
            "password": "a-strong-password-for-admin",
            "role": "admin"  
        },
    )
    assert admin_response.status_code == 201
    admin_data = admin_response.json()
    admin_id = admin_data["id"]



    # 3. Fazemos o login do admin para obter o token
    login_response = client.post(
        "/auth/token",
        data={"username": "admin.test@example.com", "password": "a-strong-password-for-admin"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    assert login_response.status_code == 200
    return login_response.json()["access_token"], admin_id


# --- Testes ---

def test_list_all_users_as_admin(client: TestClient):
    """
    Testa se um admin consegue listar todos os usuários do sistema.
    """
    admin_token, _ = create_admin_and_get_token(client)
    
    # Cria um segundo usuário para aparecer na lista
    client.post("/users/", json={"email": "client.test@example.com", "nome_completo": "Client Test", "password": "password123"})

    response = client.get(
        "/users/",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) >= 2 # Deve ter pelo menos o admin e o cliente
    assert "admin.test@example.com" in [user["email"] for user in data]
    assert "client.test@example.com" in [user["email"] for user in data]


def test_list_all_users_as_non_admin_fails(client: TestClient):
    """
    Testa se um usuário comum (cliente) não consegue listar todos os usuários.
    """
    # Cria um cliente e faz login para obter seu token
    client_response = client.post("/users/", json={"email": "client.test2@example.com", "nome_completo": "Client Test 2", "password": "password123"})
    assert client_response.status_code == 201

    login_response = client.post("/auth/token", data={"username": "client.test2@example.com", "password": "password123"}, headers={"Content-Type": "application/x-www-form-urlencoded"})
    assert login_response.status_code == 200
    client_token = login_response.json()["access_token"]

    # Tenta acessar a rota de admin com o token de cliente
    response = client.get(
        "/users/",
        headers={"Authorization": f"Bearer {client_token}"}
    )

    assert response.status_code == 403 # Forbidden
    assert "Apenas administradores" in response.json()["detail"]


def test_approve_user_as_admin(client: TestClient):
    """
    Testa se um admin consegue aprovar um usuário pendente.
    """
    admin_token, _ = create_admin_and_get_token(client)

    # Cria um usuário que nascerá com status 'pendente'
    client_response = client.post("/users/", json={"email": "pending.user@example.com", "nome_completo": "Pending User", "password": "password123"})
    assert client_response.status_code == 201
    pending_user_data = client_response.json()
    pending_user_id = pending_user_data["id"]
    assert pending_user_data["status"] == "pendente"

    # Admin aprova o usuário pendente
    response = client.patch(
        f"/users/{pending_user_id}/approve",
        headers={"Authorization": f"Bearer {admin_token}"}
    )

    assert response.status_code == 200
    approved_user_data = response.json()
    assert approved_user_data["id"] == pending_user_id
    assert approved_user_data["status"] == "ativo"