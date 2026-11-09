import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any) {
    const data = await this.categoriesService.create(body);
    return {
      success: true,
      data,
      message: 'Tạo mới danh mục thành công',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const data = await this.categoriesService.update(id, body);
    return {
      success: true,
      data,
      message: 'Cập nhật danh mục thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.categoriesService.delete(id);
    return {
      success: true,
      data,
      message: 'Xóa danh mục thành công',
    };
  }
}

