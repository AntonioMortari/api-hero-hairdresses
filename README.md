<h1 align="center" style="font-weight: bold;">API Hero Hairdresses 💻</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Rodando o projeto localmente</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#entities">Entidades</a> •
 <a href="#frontend">Frontend</a>
</p>

<p align="center">
    <b>Este projeto foi desenvolvido durante a Semana do Herói, e consiste em uma API RESTful para gerenciamento de usuários e agendamentos.</b>
</p>

<h2 id="tech">💻 Tecnologias</h2>

- Nodejs
- Express
- Typescript
- Prisma
- SQLite
- Json Web Token

<h2 id="started">🚀 Rodando o projeto localmente</h2>

Para rodar o projeto localmente você precisa do Nodejs instalado em sua máquina.

<h3>Clone o repositório</h3>

```bash
git clone https://github.com/AntonioMortari/api-hero-hairdresses.git
```

<h3>Configure as variáveis de ambiente</h2>

Use o `.env.example` como referência e crie um arquivo `.env` com suas credenciais.

```yaml
PORT= Porta de comunicação do servidor
JWT_SECRET= chave secreta para assinar tokens de autenticação
DATABASE_URL="file:./dev.db"
```

<h3>Instale as dependências</h3>

```bash
cd api-hero-hairdresses
yarn install
```

<h2 id="routes">📍 API Endpoints</h2>

​<h3>Users</h3>
| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /users</kbd>     | Retorna todos os usuários
| <kbd>POST /users</kbd>     | Cria um usuário
| <kbd>POST /users/auth</kbd>     | Retorna um token JWT
| <kbd>POST /users/refresh</kbd>     | Retorna um novo token JWT sem a necessidade de informar as credenciais do usuário
| <kbd>PUT /users/:id</kbd>     | Atualiza os dados de um usuário pelo seu id
| <kbd>DELETE /users/:id</kbd>     | Deleta um usuário pelo seu id

<h3>Schedules</h3>

| Rota               | Descrição                                          
|----------------------|-----------------------------------------------------
| <kbd>GET /schedules</kbd>     | Retorna todos os agendamentos
| <kbd>GET /schedules?date=</kbd>     | Retorna todos os agendamentos de uma determinada data
| <kbd>POST /schedules</kbd>     | Cria um novo agendamento
| <kbd>PUT /schedules/:id</kbd>     | Atualiza um agendamento pelo seu id
| <kbd>DELETE /schedules/:id</kbd>     | Delete um agendamento pelo seu id

<h2 id="entities">🏛️ Entidades</h2>

**User**
<pre>
User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar_url: string;
  schedules: Schedules[]
}</pre>

**Schedule**
<pre>
Schedule {
  id: string;
  name: string;
  phone: string;
  date: Date;
  user_id: string;
}</pre>


<h2 id="frontend">🌐 Frontend</h2>

O código-fonte do frontend deste projeto está localizado em um repositório separado. Você pode encontrá-lo [aqui](https://github.com/AntonioMortari/frontend-hero-hairdresses).
