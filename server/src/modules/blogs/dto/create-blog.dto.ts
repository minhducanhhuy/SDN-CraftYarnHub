import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateBlogDto {
  @IsNotEmpty({ message: 'Tiêu đề bài viết không được để trống' })
  @IsString({ message: 'Tiêu đề bài viết phải là chuỗi' })
  @MinLength(3, { message: 'Tiêu đề bài viết phải có ít nhất 3 ký tự' })
  title: string;

  @IsOptional()
  @IsString({ message: 'Slug bài viết phải là chuỗi ký tự' })
  slug?: string;

  @IsNotEmpty({ message: 'Đoạn trích dẫn ngắn (excerpt) không được để trống' })
  @IsString({ message: 'Đoạn trích dẫn ngắn phải là chuỗi' })
  excerpt: string;

  @IsNotEmpty({ message: 'Nội dung chi tiết bài viết không được để trống' })
  @IsString({ message: 'Nội dung bài viết phải là chuỗi' })
  content: string;

  @IsNotEmpty({ message: 'Ảnh đại diện bài viết không được để trống' })
  @IsString({ message: 'Ảnh đại diện bài viết phải là URL' })
  image_url: string;

  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  read_time?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
