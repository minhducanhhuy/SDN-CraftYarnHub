import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './schemas/order.schema';
import { Pattern, PatternSchema } from '../patterns/schemas/pattern.schema';
import { Product, ProductSchema } from '../products/schemas/product.schema';
import { Blog, BlogSchema } from '../blogs/schemas/blog.schema';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Pattern.name, schema: PatternSchema },
      { name: Product.name, schema: ProductSchema },
      { name: Blog.name, schema: BlogSchema },
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService],
})
export class OrdersModule {}
