import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { Category } from '../../categories/schemas/category.schema';

export type PatternDocument = HydratedDocument<Pattern>;

@Schema({ timestamps: true })
export class Pattern {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  category: Category | Types.ObjectId;

  @Prop({ required: true, enum: ['Dễ', 'Vừa', 'Khó'], default: 'Dễ' })
  difficulty: string;

  @Prop({ default: 2, min: 1, max: 5 })
  difficulty_stars: number;

  @Prop({ required: true })
  image_url: string;

  @Prop({ default: '' })
  img: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ type: [String], default: [] })
  materials: string[];

  @Prop({ type: [String], default: [] })
  tools: string[];

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  content: Record<string, string[]>;

  @Prop({ default: true })
  is_free: boolean;

  @Prop({ default: 0 })
  view_count: number;

  @Prop({ default: 0 })
  likes: number;

  @Prop({ default: 'Tiệm Len Xinh' })
  author: string;
}

export const PatternSchema = SchemaFactory.createForClass(Pattern);

