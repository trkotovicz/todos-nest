import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoEntity]),
    forwardRef(() => UserService),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [],
})
export class TodoModule {}
