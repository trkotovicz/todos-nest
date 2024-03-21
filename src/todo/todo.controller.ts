import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ParamId } from '../decorators/param-id.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { ErrorSwagger } from '../swagger/error.swagger';
import { TodoResponseSwagger } from '../swagger/todo.swagger';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { UpdateTodoDTO } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@ApiTags('todos')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @ApiOperation({ summary: 'Create a new ToDo' })
  @ApiResponse({
    status: 201,
    description: 'ToDo created successfully',
    type: TodoResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid inputs',
    type: ErrorSwagger,
  })
  @Post()
  async create(@Body() data: CreateTodoDTO, @Request() req) {
    return await this.todoService.create(data, req.user.id);
  }

  @ApiOperation({ summary: 'List all ToDos' })
  @ApiResponse({
    status: 200,
    description: 'ToDo list',
    type: TodoResponseSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorSwagger })
  @Get()
  async list() {
    return await this.todoService.list();
  }

  @ApiOperation({ summary: 'Find an especific ToDo' })
  @ApiParam({ name: 'todoId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'ToDo informations',
    type: TodoResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'ToDo Not Found',
    type: ErrorSwagger,
  })
  @Get(':id')
  async readOne(@ParamId() id: string) {
    return await this.todoService.readOne(id);
  }

  @ApiOperation({ summary: 'Update an ToDo' })
  @ApiParam({ name: 'todoId', type: 'string', description: 'ToDo Id' })
  @ApiBody({ type: CreateTodoDTO })
  @ApiResponse({
    status: 200,
    description: 'ToDo updated',
    type: TodoResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Inputs',
    type: ErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'ToDo Not Found',
    type: ErrorSwagger,
  })
  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateTodoDTO) {
    return await this.todoService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete an especific ToDo' })
  @ApiParam({ name: 'todoId', type: 'string', description: 'ToDo id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'ToDo Not Found',
    type: ErrorSwagger,
  })
  @Delete(':id')
  async delete(@ParamId() id: string) {
    return await this.todoService.delete(id);
  }
}
