import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createOrderDto: CreateOrderDto) {
    const data = await this.ordersService.create(createOrderDto);
    return {
      success: true,
      data,
      message: 'Đặt hàng thành công!',
    };
  }

  @Get()
  async getAll(
    @Query('status') status?: string,
    @Query('phone') phone?: string,
  ) {
    const data = await this.ordersService.findAll({ status, phone });
    return {
      success: true,
      data,
      total: data.length,
      message: 'Lấy danh sách đơn hàng thành công',
    };
  }

  @Get('lookup')
  async lookup(@Query('q') q: string) {
    if (!q) {
      return {
        success: true,
        data: [],
        message: 'Vui lòng cung cấp mã đơn hoặc số điện thoại',
      };
    }
    const data = await this.ordersService.findByCodeOrPhone(q);
    return {
      success: true,
      data,
      message: 'Tra cứu đơn hàng thành công',
    };
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    const data = await this.ordersService.findById(id);
    return {
      success: true,
      data,
      message: 'Lấy chi tiết đơn hàng thành công',
    };
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    const data = await this.ordersService.updateStatus(id, status);
    return {
      success: true,
      data,
      message: 'Cập nhật trạng thái đơn hàng thành công',
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const data = await this.ordersService.delete(id);
    return {
      success: true,
      data,
      message: 'Xóa đơn hàng thành công',
    };
  }
}
