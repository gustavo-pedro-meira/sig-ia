<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## API Documentation for Frontend

Este projeto inclui uma API REST para gerenciamento de tarefas e compromissos. Todas as rotas requerem autenticação via JWT. Primeiro, faça login para obter o token.

### Autenticação

- **Endpoint**: `POST /login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password"
  }
  ```
- **Resposta**:
  ```json
  {
    "access_token": "jwt_token_here",
    "user": {
      "name": "User Name"
    }
  }
  ```
- Use o `access_token` no header `Authorization: Bearer <token>` para todas as requisições subsequentes.

### Tarefas (Tasks)

#### Listar Tarefas do Usuário
- **Endpoint**: `GET /tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Descrição**: Retorna todas as tarefas associadas ao usuário logado.
- **Resposta**:
  ```json
  [
    {
      "id": "task_id",
      "title": "Título da Tarefa",
      "description": "Descrição",
      "deadline": "2025-10-10T23:59:59.000Z",
      "status": "ToDo",
      "priority": "Low",
      "userId": "user_id",
      "createdAt": "2025-10-04T00:00:00.000Z"
    }
  ]
  ```

#### Criar Tarefa
- **Endpoint**: `POST /tasks`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (campos obrigatórios: title, description, deadline):
  ```json
  {
    "title": "Nova Tarefa",
    "description": "Descrição da tarefa",
    "deadline": "2025-10-10T23:59:59Z",
    "status": "ToDo",  // opcional, padrão: "ToDo"
    "priority": "Medium"  // opcional, padrão: "Low"
  }
  ```
- **Descrição**: A tarefa é automaticamente associada ao usuário logado. `userId` não precisa ser enviado.

#### Editar Tarefa
- **Endpoint**: `PUT /tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Campos a serem atualizados (todos opcionais):
  ```json
  {
    "title": "Título Atualizado",
    "description": "Descrição Atualizada",
    "deadline": "2025-10-15T23:59:59Z",
    "status": "InProgress",
    "priority": "High"
  }
  ```
- **Descrição**: Atualiza apenas os campos enviados. A tarefa deve pertencer ao usuário logado.

#### Excluir Tarefa
- **Endpoint**: `DELETE /tasks/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Descrição**: Remove a tarefa. A tarefa deve pertencer ao usuário logado.

### Compromissos (Appointments)

#### Listar Compromissos do Usuário
- **Endpoint**: `GET /appointments`
- **Headers**: `Authorization: Bearer <token>`
- **Descrição**: Retorna todos os compromissos associados ao usuário logado.
- **Resposta**:
  ```json
  [
    {
      "id": "appointment_id",
      "reason": "Razão do Compromisso",
      "description": "Descrição",
      "location": "Local",
      "deadline": "2025-10-10T23:59:59.000Z",
      "status": "Scheduled",
      "userId": "user_id",
      "createdAt": "2025-10-04T00:00:00.000Z"
    }
  ]
  ```

#### Criar Compromisso
- **Endpoint**: `POST /appointments`
- **Headers**: `Authorization: Bearer <token>`
- **Body** (campos obrigatórios: reason, description, location, deadline):
  ```json
  {
    "reason": "Reunião",
    "description": "Descrição do compromisso",
    "location": "Sala 101",
    "deadline": "2025-10-10T23:59:59Z",
    "status": "Scheduled"  // opcional, padrão: "Scheduled"
  }
  ```
- **Descrição**: O compromisso é automaticamente associado ao usuário logado. `userId` não precisa ser enviado.

#### Editar Compromisso
- **Endpoint**: `PUT /appointments/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Body**: Campos a serem atualizados (todos opcionais):
  ```json
  {
    "reason": "Reunião Atualizada",
    "description": "Descrição Atualizada",
    "location": "Sala 102",
    "deadline": "2025-10-15T23:59:59Z",
    "status": "Rescheduled"
  }
  ```
- **Descrição**: Atualiza apenas os campos enviados. O compromisso deve pertencer ao usuário logado.

#### Excluir Compromisso
- **Endpoint**: `DELETE /appointments/:id`
- **Headers**: `Authorization: Bearer <token>`
- **Descrição**: Remove o compromisso. O compromisso deve pertencer ao usuário logado.

### Enums
- **TaskStatus**: "ToDo", "InProgress", "Completed", "Expired"
- **TaskPriority**: "Low", "Medium", "High", "Urgent"
- **AppointmentStatus**: "Scheduled", "Rescheduled", "Postponed", "Closed", "Cancelled"

### Notas para Frontend
- Todas as requisições para tarefas e compromissos devem incluir o token JWT.
- Datas devem estar no formato ISO 8601.
- Em caso de erro, a API retorna códigos HTTP apropriados (401 para não autorizado, 404 para não encontrado, etc.).

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
