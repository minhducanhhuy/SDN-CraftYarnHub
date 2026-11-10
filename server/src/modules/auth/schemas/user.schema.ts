import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;

  @Prop({ required: true })
  password_hash: string;

  @Prop({ default: 'Quản Trị Viên' })
  full_name: string;

  @Prop({ default: 'admin' })
  role: string;

  @Prop({ default: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin' })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
