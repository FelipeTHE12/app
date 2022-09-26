import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './order.repository';
import { Order } from './order.schema';

@Injectable()
export class AppService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(body) {
    await this.ordersRepository.create({
      dateCreated: new Date(),
      observation: 'pedido ttese',
      paid: false,
      price: 500,
    });
  }

  async listOrders() {
    return await this.ordersRepository.find({});
  }
}
