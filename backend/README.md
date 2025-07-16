# PetConnect API 🐾

![GitHub Actions CI](https://github.com/vilnercesar/petconnect-api/actions/workflows/ci.yml/badge.svg)

Uma API RESTful para a plataforma PetConnect, projetada para conectar tutores de pets a uma rede de colaboradores qualificados para diversos serviços, como pet sitter, hospedagem, passeios e mais.

## 📖 Sobre o Projeto
Este projeto serve como o backend para a plataforma PetConnect. Ele gerencia usuários, autenticação, perfis, papéis, permissões e o fluxo completo de solicitação e gerenciamento de serviços entre clientes e colaboradores.

## ✨ Funcionalidades
A API atualmente suporta um ciclo de vida completo de usuários e serviços, com foco em segurança e papéis bem definidos.

* **Autenticação e Autorização:**
    * Sistema de login seguro com tokens **JWT**.
    * Diferentes papéis de usuário (`Cliente`, `Colaborador`, `Admin`) com permissões distintas.
    * Rotas protegidas que só podem ser acessadas por usuários autenticados e/ou com papéis específicos.

* **Gerenciamento de Usuários:**
    * Cadastro público para Clientes e Colaboradores.
    * Criação de Admins apenas por outros Admins ou via script de inicialização.
    * Usuários podem gerenciar o próprio perfil (ver, editar, deletar conta e alterar senha).

* **Fluxo de Aprovação (Admin):**
    * Admins podem listar, aprovar, rejeitar/banir e deletar usuários.
    * Novos usuários (`Cliente`, `Colaborador`) entram com status `PENDENTE` e precisam de aprovação de um admin para acessar as funcionalidades principais.

* **Fluxo de Solicitação de Serviço:**
    * Clientes ativos podem solicitar serviços a colaboradores ativos e válidos.
    * Colaboradores podem ver sua fila de solicitações e aceitá-las ou recusá-las.

* **Testes e CI/CD:**
    * Suíte de testes de unidade e integração com **Pytest**.
    * Análise de cobertura de testes com **pytest-cov**.
    * Pipeline de Integração Contínua (CI) com **GitHub Actions** que roda os testes automaticamente a cada `push`.

* **Containerização:**
    * Ambiente de desenvolvimento e produção totalmente containerizado com **Docker** e **Docker Compose**.
    * Banco de dados PostgreSQL rodando como um serviço separado para persistência de dados.

## 📁 Estrutura do Projeto
```
petconnect-api/
├── .github/workflows/      # Workflows de Integração Contínua (CI)
├── app/                    # Código-fonte da aplicação FastAPI
│   ├── api/                # Módulos de roteamento (endpoints)
│   ├── core/               # Configurações centrais (DB, settings)
│   ├── models/             # Modelos SQLAlchemy (tabelas do banco)
│   ├── schemas/            # Schemas Pydantic (validação de dados)
│   └── services/           # Lógica de negócio
├── tests/                  # Testes unitários e de integração
├── .env.example            # Arquivo de exemplo para variáveis de ambiente
├── .gitignore              # Arquivos a serem ignorados pelo Git
├── create_admin.py         # Script para criar o primeiro admin
├── Dockerfile              # Receita para construir a imagem Docker da API
├── docker-compose.yml      # Orquestrador dos contêineres (API + DB)
├── pytest.ini              # Configuração do Pytest
└── requirements.txt        # Dependências Python do projeto
```

## 🛠️ Tecnologias Utilizadas
* **Backend:** [Python 3.12+](https://www.python.org/) e [FastAPI](https://fastapi.tiangolo.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
* **Validação de Dados:** [Pydantic](https://docs.pydantic.dev/)
* **Autenticação:** JWT com [python-jose](https://github.com/mpdavis/python-jose) e senhas com [passlib](https://passlib.readthedocs.io/en/stable/).
* **Testes:** [Pytest](https://docs.pytest.org/) e [pytest-cov](https://pytest-cov.readthedocs.io/)
* **CI/CD:** [GitHub Actions](https://github.com/features/actions)
* **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)

## 🚀 Como Executar o Projeto

### Pré-requisitos
* [Git](https://git-scm.com/)
* [Python 3.12+](https://www.python.org/downloads/)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Rodando com Docker (Método Recomendado)

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/vilnercesar/petconnect-api.git
    cd petconnect-api
    ```

2.  **Crie e Configure o Arquivo de Ambiente:**
    * Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.
        ```bash
        # No Windows (PowerShell), use: copy .env.example .env
        # No Linux/macOS, use: cp .env.example .env
        ```
    * **Abra o arquivo `.env` e preencha as variáveis.** Para a `SECRET_KEY`, você precisa gerar um valor aleatório e seguro. Abaixo estão as formas de fazer isso:

    * #### Gerando a `SECRET_KEY`

        * Abra um terminal com seu ambiente virtual (`venv`) ativo, execute `python` e depois os seguintes comandos:
          ```python
          import secrets
          secrets.token_hex(32)
          ```
        * Copie a string hexadecimal de 64 caracteres gerada e cole como o valor da `SECRET_KEY` no seu arquivo `.env`.


    * Preencha também a `DATABASE_PASSWORD` no arquivo `.env`.

3.  **Suba os contêineres:**
    * Este comando irá construir a imagem da API e iniciar os contêineres da API e do banco de dados.
    ```bash
    docker-compose up --build
    ```

4.  **Crie o primeiro usuário admin:**
    * Com os contêineres rodando, abra **outro terminal**.
    * Acesse o terminal do contêiner da API:
        ```bash
        docker-compose exec api bash
        ```
    * Dentro do contêiner, rode o script de criação do admin:
        ```bash
        python create_admin.py --email seu-email@admin.com --nome "Seu Nome Admin"
        ```
    * Digite a senha quando solicitado.

5.  **Acesse a API:**
    * A documentação interativa estará disponível em [http://localhost:8000/docs](http://localhost:8000/docs).

### Rodando Localmente (Sem Docker)
*(As instruções detalhadas para esta abordagem estão omitidas para brevidade, mas o processo envolve instalar o PostgreSQL localmente, ajustar o `.env` para `DATABASE_HOST=localhost` e rodar a API com `uvicorn`)*

## 🧪 Testes

Para rodar a suíte de testes localmente e ver o relatório de cobertura:

1.  Ative seu ambiente virtual (`venv`).
2.  Execute o pytest:
    ```bash
    pytest --cov=app
    ```

## 📄 Documentação da API

Com a aplicação rodando, a documentação completa e interativa (Swagger UI) gerada pelo FastAPI pode ser acessada em:

[**http://localhost:8000/docs**](http://localhost:8000/docs)

## ⚖️ Licença

Este projeto está sob a licença MIT.
