import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('/api')
export class AppController {
  private logger = new Logger();
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:bitnami@localhost:5672/app'],
        queue: 'app-backend',
      },
    });

    console.log(this.client);
  }

  @Post('order')
  createOrder(@Body() body: any): void {
    this.client.emit('create-order', {});
  }

  @Get('order')
  async listOrders() {
    return this.client.send('list-orders', {});
  }

  async showOrder() {}
}
