# app/main.py
from fastapi import FastAPI
from app.core.database import engine, Base
from app.api.endpoints import user_rounter

# Cria as tabelas no banco de dados (apenas para desenvolvimento)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PetConnect API",
    description="API para o sistema de gerenciamento de Petshops e Clínicas Veterinárias.",
    version="0.1.0",
)

@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bem-vindo à API PetConnect!"}

# Inclui as rotas de usuário na aplicação principal
app.include_router(user_rounter.router, prefix="/users", tags=["Users"])