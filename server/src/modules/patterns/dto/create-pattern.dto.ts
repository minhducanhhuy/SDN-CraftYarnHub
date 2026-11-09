import { IsNotEmpty, IsString, IsEnum, IsNumber, IsOptional, IsArray, IsBoolean, Min, Max } from 'class-validator';

export class CreatePatternDto {
  @IsNotEmpty({ message: 'Tên mẫu Chart không được để trống' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Danh mục không được để trống' })
  @IsString()
  category: string;

  @IsEnum(['Dễ', 'Vừa', 'Khó'], { message: 'Độ khó phải là Dễ, Vừa hoặc Khó' })
  difficulty: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  difficulty_stars?: number;

  @IsNotEmpty({ message: 'Link ảnh mẫu không được để trống' })
  @IsString()
  image_url: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  materials?: string[];

  @IsOptional()
  @IsArray()
  tools?: string[];

  @IsOptional()
  content?: Record<string, string[]>;

  @IsOptional()
  @IsBoolean()
  is_free?: boolean;

  @IsOptional()
  @IsString()
  author?: string;
}
