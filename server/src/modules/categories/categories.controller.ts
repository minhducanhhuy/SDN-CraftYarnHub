import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAll(@Query('type') type?: string) {
    const categories = await this.categoriesService.findAll(type);
    return {
      success: true,
      data: categories,
      message: 'Lấy danh sách danh mục thành công',
    };
  }

  @Get(':idOrSlug')
  async getOne(@Param('idOrSlug') idOrSlug: string) {
    let category = null;
    if (idOrSlug.match(/^[0-9a-fA-F]{24}$/)) {
      category = await this.categoriesService.findById(idOrSlug);
    }
    if (!category) {
      category = await this.categoriesService.findBySlug(idOrSlug);
    }
    if (!category) {
      throw new NotFoundException('Không tìm thấy danh mục');
    }
    return {
      success: true,
      data: category,
      message: 'Lấy chi tiết danh mục thành công',
    };
  }
}

