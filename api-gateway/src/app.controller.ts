import { Controller, Get, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

@Controller('/api')
export class AppController {
  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:'],
      },
    });
  }

  private logger = new Logger();
  private client: ClientProxy;

  @Get()
  getHello(): string {
    return 'ok';
  }
}
