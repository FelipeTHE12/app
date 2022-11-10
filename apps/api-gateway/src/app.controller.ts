import {
  Body,
  Controller,
  Get,
  Inject,
  LoggerService,
  Post,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Ctx,
  RmqContext,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('/api')
export class AppController {
  private client: ClientProxy;

  constructor(@Inject('LOGGER') private logger: LoggerService) {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:bitnami@localhost:5672/app'],
        noAck: false,
        queue: 'app-backend',
      },
    });
  }

  @Post('order')
  createOrder(@Body() body: any, @Ctx() context: RmqContext): void {
    console.log('MSG DELIVERED');
    this.client.emit('create-order', { teste: 'testando' });
  }

  @Get('order')
  listOrders(): Observable<any> {
    return this.client.send('list-orders', {});
  }
}
