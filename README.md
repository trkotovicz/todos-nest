# ToDo App

ToDo App é uma API com as principais funcionalidades de um gerenciador de tarefas.

## Sobre a aplicação

- A aplicação foi construída utilizando Node.JS, Typescript e o framework [Nest.JS](https://docs.nestjs.com/).
- O ORM escolhido foi o [TypeORM](https://typeorm.io/).
- O banco é o [MySQL](https://www.mysql.com/)
- As rotas são protegidas no padrão [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication).

## Requisitos

Uma pessoa deseja se cadastrar para usufruir do gerenciador de tarefas:
- Pessoa precisa estar autenticada.
- Pessoa pode ter várias tarefas.
- Não pode haver tarefas repetidas.

## Funcionalidades

- **Criar uma pessoa:** o `username` deve ser único.
	- Listar usuários.
	- Excluir usuário.
	- Editar usuário.
- **Adicionar uma tarefa**: `task` deve ser único.
	- Listar tarefas.
	- Excluir tarefas.
	- Editar tarefas.

## Variáveis de Ambiente

Para usar a aplicação, você precisará configurar as variáveis ​​de ambiente.
Renomeie o arquivo raiz do projeto `.env.example` para `.env`. Este arquivo contém todas as variáveis ​​necessárias para iniciar o aplicativo.

⚠️ **Importante**
Você deve substituir as informações do arquivo pelas credenciais do seu banco de dados.
Além disso, na variável `MYSQL_HOST` você precisará informar `localhost` para rodar o projeto **localmente**, ou `mysql` para rodar a aplicação via **Docker**.
Exemplo:
```bash
MYSQL_HOST=mysql # Para rodar pelo Docker
MYSQL_HOST=localhost # Para rodar localmente
MYSQL_USER=root
MYSQL_PASSWORD=root
```

## Inicialização da Aplicação

### Inicialização via Docker 🐳

1. Clone o repositório `git@github.com:trkotovicz/todos-nest.git`.
2. Na raíz do repositório, abra o terminal e rode o comando `npm run compose:up` e aguarde a alicação subir (esse passo pode demorar um pouco).
3. Para encerrar a aplicação, rode o comando `npm run compose:down`.

### Inicialização local 🖥

1. Clone o repositório `git@github.com:trkotovicz/todos-nest.git`.
2. Na raíz do repositório instale as dependências:
	```bash
	$ npm install
	```
3. Configure as variáveis de ambiente no arquivo `.env`
4. Inicialize o projeto:
	```bash
	$ npm start
	```


## API

Com a aplicação rodando acesse a [documentação da API](http://localhost:3001/docs/#/). </br>
 
### ⚠️ Rotas protegidas

As ações devem ser realizadas com a conta da pessoa autenticada.
O token retornado do login deve ser enviado no header com o nome de `Authorization`.

 Exemplo:
 ```
 Authorization: Bearer {TOKEN_AQUI}
 ```
 

## Banco de Dados

O aplicativo usa o banco de dados MySQL. Certifique-se de tê-lo instalado em seu computador caso queira rodar a aplicação **localmente**. A aplicação possui os scripts necessários para criar ou excluir o banco de dados.

_**Ao iniciar a aplicação, o banco de dados será criado automaticamente.**_

Scripts:
- `npm run db:create` para criar seu banco de dados.
- `npm run db:drop` para excluir o banco de dados.

 
</br>


## Testes

A aplicação possui testes unitários e testes de integração (E2E).
Para isso, foi utilizado Jest e Supertest.

```bash
# tests
npm test

# coverage
npm run test:cov
```

 
</br>

 
 ---

Projeto desenvolvido por [Thais R Kotovicz](https://www.linkedin.com/in/thaiskotovicz/).
</br>
