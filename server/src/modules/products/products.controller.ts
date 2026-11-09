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
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
  ) {
    const data = await this.productsService.findAll({ category, search });
    return {
      success: true,
      data,
      total: data.length,
      message: 'Lấy danh sách sản phẩm thành công',
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.productsService.findById(id);
    return {
      success: true,
      data,
      message: 'Lấy thông tin sản phẩm thành công',
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: any) {
    const data = await this.productsService.create(body);
    return {
      success: true,
      data,
      message: 'Thêm mới sản phẩm thành công',
    };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    const data = await this.productsService.update(id, body);
    return {
      success: true,
      data,
      message: 'Cập nhật sản phẩm thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.productsService.delete(id);
    return {
      success: true,
      data,
      message: 'Xóa sản phẩm thành công',
    };
  }
}

