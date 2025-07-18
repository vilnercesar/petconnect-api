# tests/test_users.py
from fastapi.testclient import TestClient

def test_create_user(client: TestClient):
    """
    Testa a criação de um novo usuário com sucesso.
    """
    response = client.post(
        "/users/",
        json={
            "email": "test@example.com",
            "nome_completo": "Test User",
            "password": "a-strong-password", # Senha com 8+ caracteres
            "role": "cliente"
        },
    )
    data = response.json()

    assert response.status_code == 201
    assert data["email"] == "test@example.com"
    assert data["role"] == "cliente"
    assert data["status"] == "pendente"
    assert "password" not in data
    assert "hashed_password" not in data

def test_create_user_existing_email_fails(client: TestClient):
    """
    Testa a falha ao tentar criar um usuário com um e-mail que já existe.
    """
    # Primeiro, cria um usuário para garantir que o e-mail existe
    client.post(
        "/users/",
        json={"email": "test2@example.com", "nome_completo": "Test User 2", "password": "password123"},
    )

    # Agora, tenta criar outro com o mesmo e-mail
    response = client.post(
        "/users/",
        json={"email": "test2@example.com", "nome_completo": "Another User", "password": "anotherpassword"},
    )

    # O sistema deve retornar um erro 400
    assert response.status_code == 400
    assert response.json() == {"detail": "Email já registrado"}