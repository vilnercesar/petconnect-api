# tests/conftest.py

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.main import app
from app.core.database import Base, get_db
from app.models import * 


SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture()
def db_session():
    """
    Fixture que cria um banco de dados novo para cada teste e o apaga no final.
    """
   
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        
        Base.metadata.drop_all(bind=engine)


@pytest.fixture()
def client(db_session):
    """

    Fixture que fornece um TestClient com a dependência do banco de dados
    sobrescrita para usar o banco de dados de teste em memória.
    """
   
    app.dependency_overrides[get_db] = lambda: db_session
    
    yield TestClient(app)
    
    
    app.dependency_overrides.clear()