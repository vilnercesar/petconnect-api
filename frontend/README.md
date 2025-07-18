# Frontend - PetConnect App

Esta pasta contém o código-fonte da interface de usuário do PetConnect, construída com React e Vite.

## Detalhes Técnicos
A aplicação do frontend utiliza uma arquitetura moderna baseada em componentes para criar uma experiência de usuário reativa e dinâmica.
* **Build Tool:** [Vite](https://vitejs.dev/) para um desenvolvimento rápido com Hot Module Replacement (HMR).
* **Framework:** [React](https://react.dev/) para a construção da interface.
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/) para um design rápido e responsivo.
* **Roteamento:** [React Router](https://reactrouter.com/) para a navegação entre as páginas.
* **Comunicação com API:** [Axios](https://axios-http.com/) para fazer as chamadas HTTP para o backend.
* **Estado Global:** React Context API (`AuthContext`) para gerir o estado de autenticação do usuário em toda a aplicação.

## Estrutura de Pastas do Frontend
* `src/components`: Contém os componentes reutilizáveis (botões, cabeçalho, dashboards, etc.).
* `src/pages`: Contém os componentes que representam as páginas completas da aplicação (Login, Cadastro, Perfil, etc.).
* `src/context`: Contém os providers de contexto, como o `AuthContext`.
* `src/services`: Contém os ficheiros que encapsulam a lógica de chamadas à API.

A aplicação estará disponível em `http://localhost:5173`.
