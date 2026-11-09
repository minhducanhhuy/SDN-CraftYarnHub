import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  @IsString()
  category: string;

  @IsNotEmpty({ message: 'Giá sản phẩm không được để trống' })
  @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
  @Min(0, { message: 'Giá sản phẩm không được âm' })
  price: number;

  @IsOptional()
  @IsNumber({}, { message: 'Giá gốc phải là số' })
  @Min(0)
  original_price?: number;

  @IsNotEmpty({ message: 'Link ảnh sản phẩm không được để trống' })
  @IsString()
  image_url: string;

  @IsOptional()
  @IsEnum(['Còn hàng', 'Sắp hết', 'Hết hàng'], {
    message: 'Trạng thái kho phải là: Còn hàng, Sắp hết hoặc Hết hàng',
  })
  stock_status?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  short_desc?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rating?: number;
}

