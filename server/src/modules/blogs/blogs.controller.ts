import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBlogDto: CreateBlogDto) {
    const data = await this.blogsService.create(createBlogDto);
    return {
      success: true,
      data,
      message: 'Tạo bài viết cẩm nang mới thành công',
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBlogDto: UpdateBlogDto,
  ) {
    const data = await this.blogsService.update(id, updateBlogDto);
    return {
      success: true,
      data,
      message: 'Cập nhật bài viết thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.blogsService.delete(id);
    return {
      success: true,
      data,
      message: 'Xóa bài viết thành công',
    };
  }
}

