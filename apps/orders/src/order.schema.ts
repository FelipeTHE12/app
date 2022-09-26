import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'libs/common/src/mongodb/abstract.schema';

@Schema({ versionKey: false })
export class Order extends AbstractDocument {
  @Prop()
  price: number;

  @Prop()
  observation: string;

  @Prop()
  paid: boolean = false;

  @Prop()
  dateCreated: Date = new Date();
}

export const OrderSchema = SchemaFactory.createForClass(Order);
