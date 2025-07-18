# PetConnect API 🐾

![GitHub Actions CI](https://github.com/vilnercesar/petconnect-api/actions/workflows/ci.yml/badge.svg)

Esta pasta contém todo o código-fonte da API do PetConnect, construída com FastAPI.

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
      
## Detalhes Técnicos
A API utiliza um padrão de arquitetura em camadas para separar as responsabilidades:
* **Models (`/models`):** Define a estrutura do banco de dados com SQLAlchemy.
* **Schemas (`/schemas`):** Define a estrutura dos dados da API (entrada e saída) com Pydantic.
* **Services (`/services`):** Contém a lógica de negócio principal da aplicação.
* **Endpoints (`/api/endpoints`):** Define as rotas da API e lida com as requisições e respostas HTTP.
* **Core (`/core`):** Contém as configurações centrais, como a conexão com o banco de dados.

## Endpoints Principais
A API expõe vários recursos, incluindo:
* `/auth`: Autenticação e geração de tokens JWT.
* `/users`: Gerenciamento de usuários (criação, perfil, etc.).
* `/users (Admin)`: Rotas de administração para aprovar, rejeitar e deletar usuários.
* `/service-requests`: Fluxo de solicitação e gerenciamento de serviços.

A documentação completa e interativa de todos os endpoints está disponível via Swagger UI na rota `/docs` quando a aplicação estiver rodando.


## 🛠️ Tecnologias Utilizadas
* **Backend:** [Python 3.12+](https://www.python.org/) e [FastAPI](https://fastapi.tiangolo.com/)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **ORM:** [SQLAlchemy](https://www.sqlalchemy.org/)
* **Validação de Dados:** [Pydantic](https://docs.pydantic.dev/)
* **Autenticação:** JWT com [python-jose](https://github.com/mpdavis/python-jose) e senhas com [passlib](https://passlib.readthedocs.io/en/stable/).
* **Testes:** [Pytest](https://docs.pytest.org/) e [pytest-cov](https://pytest-cov.readthedocs.io/)
* **CI/CD:** [GitHub Actions](https://github.com/features/actions)
* **Containerização:** [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)


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
