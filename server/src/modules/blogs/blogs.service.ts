import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

  async create(dto: CreateBlogDto): Promise<Blog> {
    let slug = dto.slug?.trim() || generateSlug(dto.title);
    const existing = await this.blogModel.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = new this.blogModel({
      ...dto,
      title: dto.title.trim(),
      slug,
      views: 0,
      author: dto.author || 'Bảo Vy - Tiệm Len Nhỏ',
      read_time: dto.read_time || '5 phút đọc',
      category: dto.category || 'Mẹo hay',
    });
    return newBlog.save();
  }

  async update(id: string, dto: UpdateBlogDto): Promise<Blog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID bài viết không hợp lệ');
    }

    const updateData: any = { ...dto };
    if (dto.title && !dto.slug) {
      updateData.slug = generateSlug(dto.title);
    }

    const updated = await this.blogModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Không tìm thấy bài viết để cập nhật');
    }
    return updated;
  }

  async delete(id: string): Promise<{ id: string; title: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID bài viết không hợp lệ');
    }
    const deleted = await this.blogModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Không tìm thấy bài viết để xóa');
    }
    return { id: deleted._id.toString(), title: deleted.title };
  }
}

