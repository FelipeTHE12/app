import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-order')
  async createOrder(@Payload() order: any) {
    console.log('order:', order);
  }

  @MessagePattern('list-orders')
  async listOrders() {
    console.log('EVENTO PROCESSADO');
    return this.appService.listOrders();
  }
}
