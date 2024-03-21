import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { LogInterceptor } from './interceptors/log.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('ToDo App')
    .setDescription(
      `This is a To Do app, created to manage user's tasks. \n\n Some routes are protected with JWT. \n\n So, to have access to all routes, make sure you have created a new user in "POST /auth/register" and then logged in at "POST /auth/login". \n\n After logging in, you will have access to the token necessary to authenticate on other routes.`,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalInterceptors(new LogInterceptor());

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
