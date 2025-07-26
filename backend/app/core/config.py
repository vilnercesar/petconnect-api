from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    # API
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    ADMIN_CREATION_SECRET: str

    # Database - agora a URL completa é a prioridade
    DATABASE_URL: Optional[str] = None

    # Variáveis para construir a URL se a completa não for fornecida
    DATABASE_USER: Optional[str] = None
    DATABASE_PASSWORD: Optional[str] = None
    DATABASE_NAME: Optional[str] = None
    DATABASE_HOST: Optional[str] = None
    DATABASE_PORT: Optional[int] = None

    # Constrói a URL de conexão do banco de dados se não for fornecida diretamente
    def get_database_url(self) -> str:
        if self.DATABASE_URL:

            if self.DATABASE_URL.startswith("postgres://"):
                return self.DATABASE_URL.replace("postgres://", "postgresql://", 1)
            return self.DATABASE_URL

        return f"postgresql+psycopg2://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    class Config:
        env_file = ".env"

settings = Settings()