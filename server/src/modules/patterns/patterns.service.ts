import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Pattern, PatternDocument } from './schemas/pattern.schema';
import { Category, CategoryDocument } from '../categories/schemas/category.schema';

@Injectable()
export class PatternsService {
  constructor(
    @InjectModel(Pattern.name)
    private patternModel: Model<PatternDocument>,
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async findAll(query: {
    q?: string;
    category?: string;
    difficulty?: string;
  }): Promise<Pattern[]> {
    const filter: any = {};

    if (query.q) {
      const regex = new RegExp(query.q, 'i');
      filter.$or = [
        { name: regex },
        { description: regex },
        { materials: { $in: [regex] } },
      ];
    }

    if (query.difficulty) {
      filter.difficulty = query.difficulty;
    }

    if (query.category) {
      if (Types.ObjectId.isValid(query.category)) {
        filter.category = new Types.ObjectId(query.category);
      } else {
        const cat = await this.categoryModel.findOne({ slug: query.category });
        if (cat) {
          filter.category = cat._id;
        }
      }
    }

    return this.patternModel
      .find(filter)
      .populate('category')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findFeatured(): Promise<Pattern[]> {
    return this.patternModel
      .find()
      .populate('category')
      .sort({ view_count: -1, likes: -1 })
      .limit(6)
      .exec();
  }

  async findById(id: string): Promise<Pattern> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Chart không hợp lệ');
    }
    const pattern = await this.patternModel
      .findByIdAndUpdate(id, { $inc: { view_count: 1 } }, { new: true })
      .populate('category')
      .exec();

    if (!pattern) {
      throw new NotFoundException('Không tìm thấy Chart móc len này');
    }
    return pattern;
  }

  async like(id: string): Promise<Pattern> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Chart không hợp lệ');
    }
    const pattern = await this.patternModel
      .findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true })
      .populate('category')
      .exec();

    if (!pattern) {
      throw new NotFoundException('Không tìm thấy Chart');
    }
    return pattern;
  }

  async create(data: any): Promise<Pattern> {
    if (data.category && Types.ObjectId.isValid(data.category)) {
      data.category = new Types.ObjectId(data.category);
    }
    const newPattern = new this.patternModel(data);
    const saved = await newPattern.save();
    return this.patternModel.findById(saved._id).populate('category').exec();
  }

  async update(id: string, data: any): Promise<Pattern> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Chart không hợp lệ');
    }
    if (data.category && Types.ObjectId.isValid(data.category)) {
      data.category = new Types.ObjectId(data.category);
    }
    const updated = await this.patternModel
      .findByIdAndUpdate(id, data, { new: true })
      .populate('category')
      .exec();

    if (!updated) {
      throw new NotFoundException('Không tìm thấy Chart để cập nhật');
    }
    return updated;
  }

  async delete(id: string): Promise<Pattern> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('ID Chart không hợp lệ');
    }
    const deleted = await this.patternModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Không tìm thấy Chart');
    }
    return deleted;
  }
}

