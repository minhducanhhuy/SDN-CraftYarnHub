import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Pattern } from '../../patterns/schemas/pattern.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, ref: 'Pattern', required: true })
  pattern_id: Pattern | Types.ObjectId;

  @Prop({ required: true, trim: true })
  author_name: string;

  @Prop({ default: 'https://api.dicebear.com/7.x/adventurer/svg?seed=crochet' })
  avatar: string;

  @Prop({ required: true, min: 1, max: 5, default: 5 })
  rating: number;

  @Prop({ required: true, trim: true })
  content: string;

  @Prop({ default: true })
  verified: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

