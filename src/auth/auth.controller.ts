import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { username, password }: CreateUserDTO) {
    return await this.authService.login(username, password);
  }

  @Post('register')
  async register(@Body() data: CreateUserDTO) {
    return await this.authService.register(data);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { user };
  }
}
