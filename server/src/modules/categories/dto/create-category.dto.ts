import { IsIn, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Tên danh mục không được để trống' })
  @IsString({ message: 'Tên danh mục phải là chuỗi' })
  @MinLength(2, { message: 'Tên danh mục phải có ít nhất 2 ký tự' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Slug phải là chuỗi ký tự' })
  slug?: string;

  @IsNotEmpty({ message: 'Loại danh mục không được để trống' })
  @IsIn(['pattern', 'product'], {
    message: 'Loại danh mục chỉ được là pattern (chart) hoặc product (phụ kiện)',
  })
  type: 'pattern' | 'product';

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
