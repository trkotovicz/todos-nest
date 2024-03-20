import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { ParamId } from '../decorators/param-id.decorator';
import { UpdateTodoDTO } from './dto/update-todo.dto';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() data: CreateTodoDTO) {
    return await this.todoService.create(data);
  }

  @Get()
  async list() {
    return await this.todoService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return await this.todoService.readOne(id);
  }

  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateTodoDTO) {
    return await this.todoService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return await this.todoService.delete(id);
  }
}
