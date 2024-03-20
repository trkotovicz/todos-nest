import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
import { ParamId } from '../decorators/param-id.decorator';
import { UpdateUserDTO } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return await this.userService.create(data);
  }

  @Get()
  async list() {
    return await this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: string) {
    return await this.userService.readOne(id);
  }

  @Put(':id')
  async update(@ParamId() id: string, @Body() data: UpdateUserDTO) {
    return await this.userService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: string) {
    return await this.userService.delete(id);
  }
}
