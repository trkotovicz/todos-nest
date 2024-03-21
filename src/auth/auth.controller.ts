import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../decorators/user.decorator';
import { AuthGuard } from '../guards/auth.guard';
import {
  AuthMeResponseSwagger,
  AuthResponseSwagger,
} from '../swagger/auth.swagger';
import { ErrorSwagger } from '../swagger/error.swagger';
import { CreateUserDTO } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 200,
    description: 'User logged successfully',
    type: AuthResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid inputs',
    type: ErrorSwagger,
  })
  @Post('login')
  async login(@Body() { username, password }: CreateUserDTO) {
    return await this.authService.login(username, password);
  }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDTO })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: AuthResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid inputs',
    type: ErrorSwagger,
  })
  @Post('register')
  async register(@Body() data: CreateUserDTO) {
    return await this.authService.register(data);
  }

  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Authenticate Me' })
  @ApiResponse({
    status: 201,
    description: 'User authenticated successfully',
    type: AuthMeResponseSwagger,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden resource',
    type: ErrorSwagger,
  })
  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User() user) {
    return { user };
  }
}
