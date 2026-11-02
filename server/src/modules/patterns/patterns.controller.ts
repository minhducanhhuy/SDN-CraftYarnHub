import { Controller, Get, Param, Query, Patch } from '@nestjs/common';
import { PatternsService } from './patterns.service';

@Controller('patterns')
export class PatternsController {
  constructor(private readonly patternsService: PatternsService) {}

  @Get()
  async getAll(
    @Query('q') q?: string,
    @Query('category') category?: string,
    @Query('difficulty') difficulty?: string,
  ) {
    const data = await this.patternsService.findAll({ q, category, difficulty });
    return {
      success: true,
      data,
      total: data.length,
      message: 'Lấy danh sách Chart thành công',
    };
  }

  @Get('featured')
  async getFeatured() {
    const data = await this.patternsService.findFeatured();
    return {
      success: true,
      data,
      message: 'Lấy danh sách Chart nổi bật thành công',
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.patternsService.findById(id);
    return {
      success: true,
      data,
      message: 'Lấy thông tin chi tiết Chart thành công',
    };
  }

  @Patch(':id/like')
  async likePattern(@Param('id') id: string) {
    const data = await this.patternsService.like(id);
    return {
      success: true,
      data,
      message: 'Thả tim Chart thành công',
    };
  }
}

