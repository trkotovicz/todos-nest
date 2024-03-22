import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from '../src/todo/entity/todo.entity';
import { TodoService } from '../src/todo/todo.service';

describe('TodoService', () => {
  let todoService: TodoService;
  let todoRepository: Repository<TodoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(TodoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoRepository = module.get<Repository<TodoEntity>>(
      getRepositoryToken(TodoEntity),
    );
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos: TodoEntity[] = [{ id: '1', task: 'Task 1' } as TodoEntity];
      jest.spyOn(todoRepository, 'find').mockResolvedValue(todos);

      const result = await todoService.list();
      expect(result).toEqual(todos);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      const todo: TodoEntity = { id: '1', task: 'Task 1' } as TodoEntity;
      jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);

      const result = await todoService.readOne('1');
      expect(result).toEqual(todo);
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      // const createTodoDto = { task: 'Task 1', description: 'Description 1' };
      // const userId = 'user-id';
      // const todo: TodoEntity = { id: '1', ...createTodoDto, userId };
      // jest.spyOn(todoRepository, 'create').mockReturnValue(todo);
      // jest.spyOn(todoRepository, 'save').mockResolvedValue(todo);
      // const result = await todoService.create(createTodoDto, userId);
      // expect(result).toEqual(todo);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      // const updateTodoDto = { task: 'Updated Task 1' };
      // const todo = {
      //   id: '1',
      //   task: 'Task 1',
      //   description: 'Description 1',
      //   userId: 'user-id',
      // };
      // jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);
      // jest.spyOn(todoRepository, 'update').mockResolvedValue(undefined);
      // await todoService.update('1', updateTodoDto);
      // expect(todoRepository.update).toHaveBeenCalledWith('1', updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      // const todo = {
      //   id: '1',
      //   task: 'Task 1',
      //   description: 'Description 1',
      //   userId: 'user-id',
      // };
      // jest.spyOn(todoRepository, 'findOne').mockResolvedValue(todo);
      // jest.spyOn(todoRepository, 'softRemove').mockResolvedValue(undefined);
      // await todoService.delete('1');
      // expect(todoRepository.softRemove).toHaveBeenCalledWith({ id: '1' });
    });
  });
});
