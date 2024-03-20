import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  createToken(user: UserEntity) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          username: user.username,
        },
        {
          expiresIn: '7 days',
          subject: user.id,
        },
      ),
    };
  }

  verifyToken(token: string) {
    try {
      const data = this.jwtService.verify(token);
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.verifyToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new UnauthorizedException('Invalid username or password');
    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedException('Invalid username or password');
    return this.createToken(user);
  }

  async register(data: CreateUserDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }
}
