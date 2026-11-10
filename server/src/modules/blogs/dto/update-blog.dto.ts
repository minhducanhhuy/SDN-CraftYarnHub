import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsString({ message: 'Tiêu đề bài viết phải là chuỗi' })
  @MinLength(3, { message: 'Tiêu đề bài viết phải có ít nhất 3 ký tự' })
  title?: string;

  @IsOptional()
  @IsString({ message: 'Slug bài viết phải là chuỗi ký tự' })
  slug?: string;

  @IsOptional()
  @IsString({ message: 'Đoạn trích dẫn ngắn phải là chuỗi' })
  excerpt?: string;

  @IsOptional()
  @IsString({ message: 'Nội dung bài viết phải là chuỗi' })
  content?: string;

  @IsOptional()
  @IsString({ message: 'Ảnh đại diện bài viết phải là URL' })
  image_url?: string;

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
