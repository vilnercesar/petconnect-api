# app/main.py

from fastapi import FastAPI
from app.core.database import engine
from app import models
from app.api.endpoints import user_router, auth_router, admin_router, service_request_router

#Cria TODAS as tabelas de todos os modelos importados no __init__.py
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PetConnect API",
    description="Uma API para a plataforma PetConnect, conectando tutores de pets a uma rede de colaboradores para serviços como pet sitter, hospedagem e passeios.",
    version="0.1.0",
)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bem-vindo à API PetConnect!"}

# Inclui as rotas de autenticação
app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
# Inclui as rotas de usuário
app.include_router(user_router.router, prefix="/users", tags=["Users"])
# Inclui as rotas de administração de usuários
app.include_router(admin_router.router, prefix="/users", tags=["Admin Management"])
#Inclui a rota de solicitação de serviço por um usuário
app.include_router(service_request_router.router, prefix="/service-requests", tags=["Service Requests"])
