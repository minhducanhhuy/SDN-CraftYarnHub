import { Controller, Get, Param, Query } from '@nestjs/common';
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
}

