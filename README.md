# Gerenciador de Tarefas (Fullstack)

Projeto fullstack desenvolvido como teste prático para gerenciar tarefas, com login fictício e CRUD completo.

## Tecnologias Utilizadas

### Backend
- [NestJS](https://nestjs.com/) - Framework Node.js para APIs
- [Prisma ORM](https://www.prisma.io/) - Mapeamento objeto-relacional
- [SQLite](https://www.sqlite.org/) - Banco de dados local leve

### Frontend
- [Next.js](https://nextjs.org/) - Framework React para aplicações modernas
- [React](https://reactjs.org/) - Biblioteca para interfaces
- [TailwindCSS](https://tailwindcss.com/) *(opcional)* - Estilização rápida e responsiva

---

## Pré-requisitos

- Node.js v16+ instalado: [https://nodejs.org](https://nodejs.org)  
- Git instalado: [https://git-scm.com](https://git-scm.com)

---

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio


Na pasta principal do projeto, navegue até a pasta do backend:
use no terminal: cd backend
cd backend
npm install                         # instalar dependências
npx prisma generate                  # gerar Prisma Client
npx prisma migrate dev --name init   # criar banco SQLite
npm run start:dev                    # rodar backend (http://localhost:3001)



Na pasta principal do projeto, navegue até a pasta do frontend:
use no terminal: cd frontend
npm install
npm run dev                   # Inicia o servidor Next.js (http://localhost:3000/login)

