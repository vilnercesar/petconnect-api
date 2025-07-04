# create_admin.py

import argparse
from getpass import getpass
from sqlalchemy.orm import Session
from app.core.database import SessionLocal
from app.services.user_services import create_user, get_user_by_email
from app.schemas.user import UserCreate
from app.models.user import UserRole, UserStatus

def main():
    """
    Função principal para criar um usuário administrador via linha de comando.
    """
    # Configura os argumentos esperados pela linha de comando
    parser = argparse.ArgumentParser(description="Cria um usuário administrador para a API PetConnect.")
    parser.add_argument("--email", required=True, help="Email do administrador.")
    parser.add_argument("--nome", required=True, help="Nome completo do administrador.")
    
    args = parser.parse_args()
    
    # Pede a senha de forma segura, sem mostrá-la na tela
    password = getpass("Digite a senha do administrador: ")
    password_confirm = getpass("Confirme a senha: ")

    if password != password_confirm:
        print("\nAs senhas não coincidem. Operação cancelada.")
        return

    # Inicia uma sessão com o banco de dados
    db: Session = SessionLocal()

    try:
        # Verifica se um usuário com este e-mail já existe
        existing_user = get_user_by_email(db, email=args.email)
        if existing_user:
            print(f"\nErro: O usuário com o email '{args.email}' já existe.")
            return

        # Prepara os dados do novo admin
        admin_in = UserCreate(
            email=args.email,
            nome_completo=args.nome,
            password=password,
            role=UserRole.ADMIN  # Força o papel de Admin
        )
        
        # Usa a função de serviço para criar o usuário (que terá status PENDENTE por padrão)
        new_admin = create_user(db=db, user=admin_in)
        new_admin.status = UserStatus.ATIVO
        db.commit()

        print(f"\nAdministrador '{new_admin.nome_completo}' criado com sucesso!")

    finally:
        # Garante que a sessão com o banco de dados seja fechada
        db.close()

if __name__ == "__main__":
    main()