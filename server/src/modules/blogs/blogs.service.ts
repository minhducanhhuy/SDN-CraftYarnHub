import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';

@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name)
    private blogModel: Model<BlogDocument>,
  ) {}

  async findAll(category?: string): Promise<Blog[]> {
    const filter = category && category !== 'Tất cả' ? { category } : {};
    return this.blogModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findBySlugOrId(idOrSlug: string): Promise<Blog> {
    let blog = null;
    if (Types.ObjectId.isValid(idOrSlug)) {
      blog = await this.blogModel
        .findByIdAndUpdate(idOrSlug, { $inc: { views: 1 } }, { new: true })
        .exec();
    }
    if (!blog) {
      blog = await this.blogModel
        .findOneAndUpdate({ slug: idOrSlug }, { $inc: { views: 1 } }, { new: true })
        .exec();
    }
    if (!blog) {
      throw new NotFoundException('Không tìm thấy bài viết');
    }
    return blog;
  }
}

