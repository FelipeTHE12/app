import { Injectable } from '@nestjs/common';
import { Order } from './order';

@Injectable()
export class AppService {
  orders: Order[] = [
    {
      id: 1,
      product: 'produto',
      value: 30,
      date: new Date(),
      paid: false,
    },
    {
      id: 2,
      product: 'produto2',
      value: 40,
      date: new Date(),
      paid: false,
    },
    {
      id: 3,
      product: 'produto3',
      value: 50,
      date: new Date(),
      paid: false,
    },
  ];

  listOrders() {
    return this.orders;
  }
}
