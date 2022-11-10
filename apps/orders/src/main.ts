import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:bitnami@localhost:5672/app'],
      queue: 'app-backend',
      noAck: false,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);

  await app.listen();

  console.log('ORDERS ON !');
}
bootstrap();
