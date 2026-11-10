import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Giá sản phẩm phải là số' })
  @Min(0, { message: 'Giá sản phẩm không được âm' })
  price?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Giá gốc phải là số' })
  @Min(0)
  original_price?: number;

  @IsOptional()
  @IsString()
  image_url?: string;

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

