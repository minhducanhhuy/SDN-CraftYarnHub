import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | Types.ObjectId;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ min: 0, default: 0 })
  original_price: number;

  @Prop({ required: true })
  image_url: string;

  @Prop({
    required: true,
    enum: ['Còn hàng', 'Sắp hết', 'Hết hàng'],
    default: 'Còn hàng',
  })
  stock_status: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: 'Sản phẩm handmade và phụ kiện đan móc cao cấp' })
  short_desc: string;

  @Prop({ default: 0 })
  rating: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

