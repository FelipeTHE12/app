import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { AbstractRepository } from 'libs/common/src/mongodb/abstract.repository';
import { Logger } from '@nestjs/common';
import { Connection, Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
  protected readonly logger: Logger = new Logger(OrdersRepository.name);

  constructor(
    @InjectModel(Order.name) orderModel: Model<Order>,
    @InjectConnection() connection: Connection,
  ) {
    super(orderModel, connection);
  }
}
