import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoEntity } from './entity/todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async create(data: CreateTodoDTO): Promise<TodoEntity> {
    await this.existsTask(data.task);
    const todo = this.todoRepository.create({
      id: randomUUID(),
      ...data,
    });
    await this.todoRepository.save(todo);
    return todo;
  }

  async list(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async readOne(id: string): Promise<TodoEntity> {
    return await this.todoRepository.findOneOrFail({ where: { id } });
  }

  async update(id: string, data: UpdateTodoDTO): Promise<void> {
    await this.findById(id);

    const updateData: Partial<UpdateTodoDTO> = {};
    if (data.task) {
      await this.existsTask(data.task);
      updateData.task = data.task;
    }
    if (data.description) updateData.description = data.description;
    await this.todoRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);
    await this.todoRepository.softRemove({ id });
  }

  async existsTask(task: string): Promise<void | Error> {
    if (await this.todoRepository.exists({ where: { task } })) {
      throw new ConflictException(
        `The task '${task}' has been created already`,
      );
    }
  }

  async findById(id: string): Promise<void | Error> {
    if (!(await this.todoRepository.existsBy({ id }))) {
      throw new NotFoundException(`Task ${id} not found`);
    }
  }
}
