Gerenciador de Tarefas (Fullstack - Next.js + NestJS + Prisma + SQLite)

Este é um projeto fullstack que desenvolvi do zero como um teste prático. Ele permite gerenciar tarefas, com funcionalidades de login fictício e CRUD completo, utilizando:

- Frontend:** Next.js + React
- Backend:** NestJS + Prisma
- Banco de Dados:** SQLite (persistência local simples)

---

 🧰 Tecnologias Utilizadas

 📦 Backend
- [NestJS](https://nestjs.com/) - framework Node.js para construção de APIs
- [Prisma ORM](https://www.prisma.io/) - mapeamento objeto-relacional
- [SQLite](https://www.sqlite.org/) - banco de dados leve e local

 💻 Frontend
- [Next.js](https://nextjs.org/) - framework React para aplicações modernas
- [React](https://reactjs.org/) - biblioteca JS para interfaces de usuário
- [TailwindCSS](https://tailwindcss.com/) *(opcional)* - estilização rápida e responsiva

---

⚙️ Como Rodar o Projeto ?

Instruções Abaixo
 
1 Pré-requisitos: você precisa ter o Node.js instalado no seu computador (versão 16+ recomendada).
Instale a partir do site oficial: https://nodejs.org

2 Instalar o Git (se não tiver instalado)
Link para instalar: https://git-scm.com
após instalado ogit clone https://github.com/seu-usuario/seu-repositorio.git  para clonar o projeto
 
3 entre no terminal da pasta fullstack e acesse a pasta back end do projeto via terminal 
e instale as dependencia com o comando npm install 


4 Configuração do Banco de dados Abaixo 

*No terminal use o comando npx prisma generate antes de qualquer coisa , você precisa gerar o cliente Prisma, que é a camada que você irá se comunicar com o banco de dados

*use npx prisma migrate dev (Para criar as tabelas no banco de dados, caso ainda não tenha feito isso) 

*para vizualizar o prisma use o comando via terminal  npx prisma studio abre na porta http://localhost:5555/


5
Para subir a aplicação frontend e back end 

-FRONTEND
  *Abrir o Terminal para o Frontend (Next.js)
  *navegar até a pasta do frontend, e rodar o comando: npm run dev  para iniciar o servidor do  
  *O frontend estará disponível em http://localhost:3000/login
 

- BACKEND (NestJS)
  *abrir um segundo terminal direto na pasta backend e rodar o comando: npm run start:dev  para iniciar o servidor do NestJS 
  *O backend estará disponível em http://localhost:3001
   

 parte da DOCUMENTAÇÃO DA API   
 A API está documentada com Swagger em:
http://localhost:3001/api

Todas as operações de tarefas são feitas via chamadas REST para http://localhost:3001/tasks




 
