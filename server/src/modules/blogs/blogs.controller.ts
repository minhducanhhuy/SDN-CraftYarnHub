import { Controller, Get, Param, Query } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async getAll(@Query('category') category?: string) {
    const data = await this.blogsService.findAll(category);
    return {
      success: true,
      data,
      total: data.length,
      message: 'Lấy danh sách bài viết blog thành công',
    };
  }

  @Get(':idOrSlug')
  async getOne(@Param('idOrSlug') idOrSlug: string) {
    const data = await this.blogsService.findBySlugOrId(idOrSlug);
    return {
      success: true,
      data,
      message: 'Lấy chi tiết bài viết thành công',
    };
  }
}

