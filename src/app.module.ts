import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DBConfig } from './config/db.config';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.ENV === 'test' ? '.env.test' : '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: DBConfig,
      inject: [DBConfig],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]),
    forwardRef(() => UserModule),
    forwardRef(() => TodoModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
