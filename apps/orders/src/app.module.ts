import { Module } from '@nestjs/common';
import { AppController } from './presentation/app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './order.schema';
import { OrderSchema } from './order.schema';
import { OrdersRepository } from './order.repository';
import { DatabaseModule } from '@app/common/mongodb/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
      envFilePath: './apps/orders/.env',
    }),
    MongooseModule.forFeature([
      {
        name: Order.name,
        schema: OrderSchema,
      },
    ]),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, OrdersRepository],
})
export class AppModule {}
