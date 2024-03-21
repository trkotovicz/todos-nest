import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
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
import { UserResponseSwagger } from '../swagger/user.swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('users')
@ApiBearerAuth('access-token')
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid inputs',
    type: ErrorSwagger,
  })
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'Users list',
    type: UserResponseSwagger,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'Bad Request', type: ErrorSwagger })
  @Get()
  async list() {
    return await this.userService.list();
  }

  @ApiOperation({ summary: 'Find an especific user' })
  @ApiParam({ name: 'userId', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'User informations',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: ErrorSwagger,
  })
  @Get(':id')
  async readOne(@ParamId() id: string) {
    return await this.userService.readOne(id);
  }

  @ApiOperation({ summary: 'Update an user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User Id' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 200,
    description: 'User updated',
    type: UserResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid Inputs',
    type: ErrorSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: ErrorSwagger,
  })
  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateUserDTO) {
    return await this.userService.update(id, data);
  }

  @ApiOperation({ summary: 'Delete an especific user' })
  @ApiParam({ name: 'userId', type: 'string', description: 'User id' })
  @ApiResponse({ status: 200 })
  @ApiResponse({
    status: 404,
    description: 'User Not Found',
    type: ErrorSwagger,
  })
  @Delete(':id')
  async delete(@ParamId() id: string) {
    return await this.userService.delete(id);
  }
}
