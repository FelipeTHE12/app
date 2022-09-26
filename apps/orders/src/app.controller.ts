import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
  RpcException,
} from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller('order')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async createOrder() {
    console.log('Yo');
    return await this.appService.createOrder({});
  }

  @Get()
  async listOrders() {
    const a = 1;
    return await this.appService.listOrders();
  }

  // @EventPattern('create-order')
  // async createOrder(@Payload() order: any, @Ctx() ctx: RmqContext) {
  //   console.log('ORDEM RECEBIDA');

  //   const channel = ctx.getChannelRef();
  //   const message = ctx.getMessage();

  //   if (!order.a) {
  //     console.log('DADOS INVALIDOS');
  //     throw new RpcException('Dados inválidos');
  //   }

  //   await channel.ack(message);
  // }

  // @MessagePattern('list-orders')
  // async listOrders(@Ctx() ctx: RmqContext) {
  //   const channel = ctx.getChannelRef();
  //   const message = ctx.getMessage();
  //   //throw new RpcException('ABC');

  //   console.log('Passou');
  //   return this.appService.listOrders() && (await channel.ack(message));
  // }
}
