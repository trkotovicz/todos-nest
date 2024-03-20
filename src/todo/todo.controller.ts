import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ParamId } from '../decorators/param-id.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@UseGuards(AuthGuard)
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
