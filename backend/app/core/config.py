# app/core/config.py
from pydantic_settings import BaseSettings

#carrega as variaveis de ambiente
class Settings(BaseSettings):
    # API
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # Database
    DATABASE_USER: str
    DATABASE_PASSWORD: str
    DATABASE_NAME: str
    DATABASE_HOST: str
    DATABASE_PORT: int

    # Constrói a URL de conexão do banco de dados
    @property
    def DATABASE_URL(self) -> str:
        return f"postgresql+psycopg2://{self.DATABASE_USER}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOST}:{self.DATABASE_PORT}/{self.DATABASE_NAME}"

    class Config:
        env_file = ".env"

settings = Settings()