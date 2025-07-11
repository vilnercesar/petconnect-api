from fastapi.testclient import TestClient


def create_user_for_test(client: TestClient):
    """Cria um usuário padrão para ser usado nos testes de login."""
    client.post(
        "/users/",
        json={
            "email": "login.test@example.com",
            "nome_completo": "Login Test User",
            "password": "a-correct-password", # Senha válida com mais de 8 caracteres
        },
    )

def test_login_success(client: TestClient):
    """
    Testa o fluxo de login com credenciais corretas.
    """

    create_user_for_test(client)


    response = client.post(
        "/auth/token",
        data={"username": "login.test@example.com", "password": "a-correct-password"},
        
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )

    data = response.json()

    
    assert response.status_code == 200
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_wrong_password_fails(client: TestClient):
    """
    Testa a falha de login ao fornecer a senha incorreta.
    """
   
    create_user_for_test(client)

  
    response = client.post(
        "/auth/token",
        data={"username": "login.test@example.com", "password": "wrong-password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )

  
    assert response.status_code == 401
    assert response.json() == {"detail": "Email ou senha incorretos"}


def test_login_wrong_email_fails(client: TestClient):
    """
    Testa a falha de login ao fornecer um email que não existe.
    """
    response = client.post(
        "/auth/token",
        data={"username": "nonexistent@example.com", "password": "any-password"},
        headers={"Content-Type": "application/x-www-form-urlencoded"}
    )
    
    assert response.status_code == 401
    assert response.json() == {"detail": "Email ou senha incorretos"}