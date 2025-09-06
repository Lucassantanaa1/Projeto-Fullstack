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


BACKEND-PASSO A PASSO PARA RODAR A APLICAÇÃO

você deve renomear o arquivo .env.example para .env , esse arquivo esta dentro da pasta prisma que está contida dentro da pasta backend do projeto
abra o terminal e navegue até a pasta do backend , use no terminal: cd backend
em seguida 
npm install                         # instalar dependências
npx prisma generate                  # gerar Prisma Client
npx prisma migrate dev --name init   # criar banco SQLite
npm run start:dev                    # rodar backend (http://localhost:3001)



Na pasta principal do projeto, navegue até a pasta do frontend:
use no terminal: cd frontend
npm install
npm run dev                   # Inicia o servidor Next.js (http://localhost:3000/login)


após fazer o passo a passo acima acesse a url para ver a aplicação rodando

http://localhost:3000            -> área de login
http://localhost:3000/tasks/new  -> área de listagem de tarefas
http://localhost:3001/tasks      -> área do backend mostrando os dados
http://localhost:3001            -> porta onde roda o backend 
