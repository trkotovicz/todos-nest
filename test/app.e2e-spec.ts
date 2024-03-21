import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { CreateTodoDTO } from '../src/todo/dto/create-todo.dto';
import { UpdateTodoDTO } from '../src/todo/dto/update-todo.dto';
import { TodoEntity } from '../src/todo/entity/todo.entity';
import { CreateUserDTO } from '../src/user/dto/create-user.dto';
import { UpdateUserDTO } from '../src/user/dto/update-user.dto';
import { UserEntity } from '../src/user/entity/user.entity';
import { AppModule } from './../src/app.module';

const createUser1: CreateUserDTO = {
  username: 'user_test',
  password: 'P@ssword123',
};
const createUser2: CreateUserDTO = {
  username: 'user_test_2',
  password: 'P@ssword123',
};
const updateUser1: UpdateUserDTO = {
  username: 'update_user_test',
  password: 'Upd@te123',
};
const createTodo: CreateTodoDTO = {
  task: 'new task',
  description: 'task test',
};
const createTodo2: CreateTodoDTO = {
  task: 'new task 2',
  description: 'task 2 test',
};
const updateTodo: UpdateTodoDTO = {
  task: 'update task',
  description: 'updated test',
};

describe('App (e2e)', () => {
  let app: INestApplication;
  let userToken: string;
  let userId1: string;
  let userId2: string;
  let userData: UserEntity;
  let todoId1: string;
  let todoId2: string;
  let todoData: TodoEntity;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  describe('Auth (e2e)', () => {
    it('should be able to register a new user with valid data', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUser1);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('accessToken');

      userToken = response.body.accessToken;
    });

    it('should not be able to register a user with username already in use', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/register')
        .send(createUser1);

      expect(response.statusCode).toEqual(409);
    });

    it('should be able to login with valid data', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(createUser1);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('accessToken');
    });

    it('should be able to autthenticate with a valid token', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/me')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body.user).toHaveProperty('id');
      expect(response.body.user).toHaveProperty('username');
      expect(response.body.user).toHaveProperty('password');

      userData = response.body.user;
      userId1 = response.body.user.id;
    });
  });

  describe('User (e2e)', () => {
    it('should not be able to create a user without auth token', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUser2);

      expect(response.statusCode).toEqual(403);
    });

    it('should be able to create a new user', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUser2)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('username');
      expect(response.body).toHaveProperty('password');

      userId2 = response.body.id;
    });

    it('should not be able to create a user with username already in use', async () => {
      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUser1)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(409);
    });

    it('should return a list with all users', async () => {
      const response = await request(app.getHttpServer())
        .get('/users')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);
    });

    it('should return data of an especific user', async () => {
      const response = await request(app.getHttpServer())
        .get(`/users/${userId1}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual(userData);
    });

    it('should throw an 404 error if id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/users/id1')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });

    it('should be able to update data of an especific user', async () => {
      const response = await request(app.getHttpServer())
        .put(`/users/${userId1}`)
        .send(updateUser1)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toStrictEqual({});

      const createdAt = new Date(response.body.createdAt);
      const updatedAt = new Date(response.body.updatedAt);

      expect(createdAt).not.toEqual(updatedAt);
    });

    it('should be able to delete an especific user', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${userId2}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toStrictEqual({});
    });

    it('should not be able to delete if id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/users/${userId2}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Todo (e2e)', () => {
    it('should not be able to create a todo without auth token', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .send(createTodo);

      expect(response.statusCode).toEqual(403);
    });

    it('should be able to create a todo', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .send(createTodo)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(201);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('id');
      expect(response.body.task).toEqual(createTodo.task);
      expect(response.body.description).toEqual(createTodo.description);

      todoId1 = response.body.id;
      todoData = response.body;
    });

    it('should not be able to create a todo that have been already created', async () => {
      const response = await request(app.getHttpServer())
        .post('/todos')
        .send(createTodo)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(409);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });

    it('should return a list with all todos', async () => {
      const response2 = await request(app.getHttpServer())
        .post('/todos')
        .send(createTodo2)
        .set('Authorization', `Bearer ${userToken}`);

      todoId2 = response2.body.id;

      const response = await request(app.getHttpServer())
        .get('/todos')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body).toHaveLength(2);
    });

    it('should return data of an especific todo', async () => {
      const response = await request(app.getHttpServer())
        .get(`/todos/${todoId1}`)
        .set('Authorization', `Bearer ${userToken}`);

      delete todoData.userId;

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toEqual(todoData);
    });

    it('should throw an 404 error if id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .get('/todos/id1')
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });

    it('should be able to update data of an especific todo', async () => {
      const response = await request(app.getHttpServer())
        .put(`/todos/${todoId1}`)
        .send(updateTodo)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toStrictEqual({});

      const createdAt = new Date(response.body.createdAt);
      const updatedAt = new Date(response.body.updatedAt);

      expect(createdAt).not.toEqual(updatedAt);
    });

    it('should be able to delete an especific todo', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/todos/${todoId2}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(200);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toStrictEqual({});
    });

    it('should not be able to delete if id does not exist', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/todos/${todoId2}`)
        .set('Authorization', `Bearer ${userToken}`);

      expect(response.statusCode).toEqual(404);
      expect(response.body).toBeInstanceOf(Object);
      expect(response.body).toHaveProperty('message');
      expect(response.body).toHaveProperty('error');
    });
  });
});
