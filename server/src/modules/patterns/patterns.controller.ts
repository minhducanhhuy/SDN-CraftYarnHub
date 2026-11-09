import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Patch,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PatternsService } from './patterns.service';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { UpdatePatternDto } from './dto/update-pattern.dto';

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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createPatternDto: CreatePatternDto) {
    const data = await this.patternsService.create(createPatternDto);
    return {
      success: true,
      data,
      message: 'Thêm mới mẫu Chart thành công',
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePatternDto: UpdatePatternDto,
  ) {
    const data = await this.patternsService.update(id, updatePatternDto);
    return {
      success: true,
      data,
      message: 'Cập nhật mẫu Chart thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.patternsService.delete(id);
    return {
      success: true,
      data,
      message: 'Xóa mẫu Chart thành công',
    };
  }
}

