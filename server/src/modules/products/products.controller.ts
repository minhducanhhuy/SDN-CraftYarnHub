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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

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
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productsService.create(createProductDto);
    return {
      success: true,
      data,
      message: 'Thêm mới sản phẩm thành công',
    };
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = await this.productsService.update(id, updateProductDto);
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


