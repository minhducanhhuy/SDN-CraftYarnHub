import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { Pattern, PatternDocument } from '../patterns/schemas/pattern.schema';
import { Product, ProductDocument } from '../products/schemas/product.schema';
import { Blog, BlogDocument } from '../blogs/schemas/blog.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(Pattern.name)
    private patternModel: Model<PatternDocument>,
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
    @InjectModel(Blog.name)
    private blogModel: Model<BlogDocument>,
  ) {}

  async getStats(): Promise<{
    totalOrders: number;
    newOrders: number;
    totalRevenue: number;
    totalPatterns: number;
    totalProducts: number;
    totalBlogs: number;
  }> {
    const [
      totalOrders,
      newOrders,
      totalPatterns,
      totalProducts,
      totalBlogs,
      validOrders,
    ] = await Promise.all([
      this.orderModel.countDocuments().exec(),
      this.orderModel.countDocuments({ status: 'Chờ xác nhận' }).exec(),
      this.patternModel.countDocuments().exec(),
      this.productModel.countDocuments().exec(),
      this.blogModel.countDocuments().exec(),
      this.orderModel.find({ status: { $ne: 'Đã hủy' } }).select('total_amount').exec(),
    ]);

    const totalRevenue = validOrders.reduce((sum, o) => sum + (o.total_amount || 0), 0);

    return {
      totalOrders,
      newOrders,
      totalRevenue,
      totalPatterns,
      totalProducts,
      totalBlogs,
    };
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Giỏ hàng trống, không thể tạo đơn hàng');
    }

    // Sinh mã đơn hàng tự động dạng ORD-XXXXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderCode = `ORD-${Date.now().toString().slice(-4)}${randomSuffix}`;

    const formattedItems = dto.items.map((item) => ({
      product_id: new Types.ObjectId(item.product_id),
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: item.image_url || '',
    }));

    const newOrder = new this.orderModel({
      order_code: orderCode,
      customer_name: dto.customer_name.trim(),
      phone: dto.phone.trim(),
      address: dto.address.trim(),
      note: dto.note ? dto.note.trim() : '',
      items: formattedItems,
      total_amount: dto.total_amount,
      status: 'Chờ xác nhận',
    });

    return newOrder.save();
  }

  async findAll(query?: { status?: string; phone?: string }): Promise<Order[]> {
    const filter: any = {};
    if (query?.status && query.status !== 'all') {
      filter.status = query.status;
    }
    if (query?.phone) {
      filter.phone = new RegExp(query.phone.trim(), 'i');
    }
    return this.orderModel.find(filter).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID đơn hàng không hợp lệ');
    }
    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return order;
  }

  async findByCodeOrPhone(keyword: string): Promise<Order[]> {
    const trimmed = keyword.trim();
    return this.orderModel
      .find({
        $or: [{ order_code: trimmed }, { phone: trimmed }],
      })
      .sort({ createdAt: -1 })
      .exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID đơn hàng không hợp lệ');
    }
    const validStatuses = ['Chờ xác nhận', 'Đang xử lý', 'Đã giao', 'Đã hủy'];
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Trạng thái đơn hàng không hợp lệ');
    }

    const updated = await this.orderModel
      .findByIdAndUpdate(id, { status }, { new: true })
      .exec();

    if (!updated) {
      throw new NotFoundException('Không tìm thấy đơn hàng để cập nhật');
    }
    return updated;
  }

  async delete(id: string): Promise<Order> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('ID đơn hàng không hợp lệ');
    }
    const deleted = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }
    return deleted;
  }
}
