# tests/conftest.py
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.database import Base, get_db

# URL para um banco de dados SQLite em memória
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool, 
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Cria as tabelas antes de os testes começarem
Base.metadata.create_all(bind=engine)

# Fixture para usar o banco de dados de teste em vez do banco real
@pytest.fixture()
def db_session_override():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

# Fixture principal que os testes usarão
@pytest.fixture()
def client(db_session_override):
    # Sobrescreve a dependência get_db para usar a sessão do banco de teste
    app.dependency_overrides[get_db] = lambda: db_session_override

    # Cria um cliente de teste para fazer requisições à API
    with TestClient(app) as test_client:
        yield test_client

    # Limpa a sobrescrita após o teste para não afetar outros
    app.dependency_overrides.clear()