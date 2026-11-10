import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

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
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(type?: string): Promise<Category[]> {
    const filter = type ? { type } : {};
    return this.categoryModel.find(filter).sort({ createdAt: 1 }).exec();
  }

  async findBySlug(slug: string): Promise<Category | null> {
    return this.categoryModel.findOne({ slug }).exec();
  }

  async findById(id: string): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Danh mục không hợp lệ');
    }
    const cat = await this.categoryModel.findById(id).exec();
    if (!cat) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return cat;
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const slug = dto.slug?.trim() || generateSlug(dto.name);
    const existing = await this.categoryModel.findOne({
      $or: [{ name: dto.name.trim() }, { slug }],
    });
    if (existing) {
      throw new BadRequestException('Tên hoặc slug của danh mục đã tồn tại');
    }

    const newCategory = new this.categoryModel({
      ...dto,
      name: dto.name.trim(),
      slug,
    });
    return newCategory.save();
  }

  async update(id: string, dto: UpdateCategoryDto): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Danh mục không hợp lệ');
    }

    const updateData: any = { ...dto };
    if (dto.name && !dto.slug) {
      updateData.slug = generateSlug(dto.name);
    }

    const updated = await this.categoryModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Không tìm thấy danh mục để cập nhật');
    }
    return updated;
  }

  async delete(id: string): Promise<{ id: string; name: string }> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Danh mục không hợp lệ');
    }
    const deleted = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Không tìm thấy danh mục để xóa');
    }
    return { id: deleted._id.toString(), name: deleted.name };
  }
}

