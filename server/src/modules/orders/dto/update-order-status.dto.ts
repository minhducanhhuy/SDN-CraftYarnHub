import { IsNotEmpty, IsIn } from 'class-validator';

export class UpdateOrderStatusDto {
  @IsNotEmpty({ message: 'Trạng thái đơn hàng không được để trống' })
  @IsIn(['Chờ xác nhận', 'Đang xử lý', 'Đã giao', 'Đã hủy'], {
    message:
      'Trạng thái phải là: Chờ xác nhận, Đang xử lý, Đã giao hoặc Đã hủy',
  })
  status: string;
}

