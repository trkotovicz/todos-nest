import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([TodoEntity]),
    forwardRef(() => UserModule),
  ],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
