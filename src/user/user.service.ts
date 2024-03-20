import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async create({ username, password }: CreateUserDTO): Promise<UserEntity> {
    await this.existsUsername(username);
    password = await this.hashPassword(password);

    const user = this.userRepository.create({
      id: randomUUID(),
      username,
      password,
    });
    await this.userRepository.save(user);

    return user;
  }

  async list(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async readOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateUserDTO): Promise<void> {
    const updateData: Partial<UpdateUserDTO> = {};
    if (data.username) {
      await this.existsUsername(data.username);
      updateData.username = data.username;
    }
    if (data.password) {
      updateData.password = await this.hashPassword(data.password);
    }
    await this.userRepository.update(id, updateData);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.softRemove({ id });
  }

  async existsUsername(username: string): Promise<void | Error> {
    if (await this.userRepository.exists({ where: { username } })) {
      throw new ConflictException(`Username ${username} already in use`);
    }
  }
}
