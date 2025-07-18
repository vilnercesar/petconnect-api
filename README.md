# PetConnect API 🐾

![GitHub Actions CI](https://github.com/vilnercesar/petconnect-api/actions/workflows/ci.yml/badge.svg)

Uma API RESTful para a plataforma PetConnect, projetada para conectar tutores de pets a uma rede de colaboradores qualificados para diversos serviços, como pet sitter, hospedagem, passeios e mais.

## 📖 Sobre o Projeto
Este projeto contém a aplicação full-stack da plataforma PetConnect, incluindo uma API de backend construída com FastAPI e uma interface de frontend construída com React. O objetivo é criar um ecossistema completo onde clientes podem encontrar e contratar serviços para os seus pets, e colaboradores podem oferecer e gerir os seus serviços.

O fluxo de requisitos do sistema foi baseado no seguinte diagrama de casos de uso.

Para mais detalhes sobre cada parte da aplicação, consulte a documentação específica:
* **[Documentação do Backend (API)](./backend/README.md)**
* **[Documentação do Frontend (React)](./frontend/README.md)**

## 🛠️ Tecnologias Utilizadas
* **Backend:** Python, FastAPI, SQLAlchemy, PostgreSQL
* **Frontend:** React, Vite, Tailwind CSS, Axios
* **Testes:** Pytest, pytest-cov
* **CI/CD:** GitHub Actions
* **Containerização:** Docker, Docker Compose

## 🚀 Como Executar o Projeto Completo (Docker)

A maneira recomendada para executar este projeto é usando o Docker, que orquestra todos os serviços (backend, frontend e banco de dados) de forma integrada.

### Pré-requisitos
* **[Git](https://git-scm.com/)**: Para controle de versão.
* **[Python 3.12+](https://www.python.org/downloads/)**: Para o ambiente de desenvolvimento do backend e para executar os testes.
* **[Node.js (LTS)](https://nodejs.org/)**: Para o ambiente de desenvolvimento do frontend.
* **[Docker Desktop](https://www.docker.com/products/docker-desktop/)**: Para executar a aplicação completa de forma containerizada.
* **[PostgreSQL](https://www.postgresql.org/download/)**: Para rodar o banco de dados.

### Passos para a Execução

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/vilnercesar/petconnect-project.git
    cd petconnect-project
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


5.  **Acesse a Aplicação:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Documentação da API (Backend):** [http://localhost:8000/docs](http://localhost:8000/docs)

## ⚖️ Licença
Este projeto está sob a licença MIT.
