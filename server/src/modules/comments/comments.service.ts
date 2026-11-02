import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<CommentDocument>,
  ) {}

  async findByPattern(patternId: string): Promise<Comment[]> {
    if (!Types.ObjectId.isValid(patternId)) {
      throw new BadRequestException('ID Chart không hợp lệ');
    }
    return this.commentModel
      .find({ pattern_id: new Types.ObjectId(patternId) })
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(data: {
    pattern_id: string;
    author_name: string;
    rating: number;
    content: string;
  }): Promise<Comment> {
    if (!Types.ObjectId.isValid(data.pattern_id)) {
      throw new BadRequestException('ID Chart không hợp lệ');
    }
    if (!data.author_name || !data.content) {
      throw new BadRequestException('Họ tên và nội dung đánh giá không được để trống');
    }
    const seed = encodeURIComponent(data.author_name.trim().toLowerCase());
    const newComment = new this.commentModel({
      pattern_id: new Types.ObjectId(data.pattern_id),
      author_name: data.author_name.trim(),
      avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`,
      rating: Number(data.rating) || 5,
      content: data.content.trim(),
      verified: true,
    });
    return newComment.save();
  }
}

