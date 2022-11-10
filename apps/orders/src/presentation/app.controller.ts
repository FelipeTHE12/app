import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { AppService } from '../app.service';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('create-order')
  async createOrder(@Payload() order: any, @Ctx() ctx: RmqContext) {
    console.log('ORDER MSG RECEIVED');
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();
    await this.appService.createOrder({});

    await channel.ack(message);
  }

  @MessagePattern('list-orders')
  async listOrders(@Ctx() ctx: RmqContext) {
    console.log('LISTING ORDERDS...');
    const channel = ctx.getChannelRef();
    const message = ctx.getMessage();

    const orders = await this.appService.listOrders();
    await channel.ack(message);
    return orders;
  }
}
