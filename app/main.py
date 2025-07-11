# app/main.py

from contextlib import asynccontextmanager
from fastapi import FastAPI

from app import models
from app.core.database import engine
from app.api.endpoints import (
    auth_router,
    user_router,
    admin_router,
    service_request_router,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    
    print("INFO:     Criando tabelas no banco de dados...")
    models.Base.metadata.create_all(bind=engine)
    yield
    print("INFO:     Aplicação encerrada.")


app = FastAPI(
    title="PetConnect API",
    description="Uma API para a plataforma PetConnect, conectando tutores de pets a uma rede de colaboradores para serviços como pet sitter, hospedagem e passeios.",
    version="0.1.0",
    lifespan=lifespan  
)



@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Bem-vindo à API PetConnect!"}

app.include_router(auth_router.router, prefix="/auth", tags=["Authentication"])
app.include_router(user_router.router, prefix="/users", tags=["Users"])
app.include_router(admin_router.router, prefix="/users", tags=["Admin Management"])
app.include_router(service_request_router.router, prefix="/service-requests", tags=["Service Requests"])