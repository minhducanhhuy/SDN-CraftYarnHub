import { IsString, IsEnum, IsNumber, IsOptional, IsArray, IsBoolean, Min, Max } from 'class-validator';

export class UpdatePatternDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(['Dễ', 'Vừa', 'Khó'])
  difficulty?: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  difficulty_stars?: number;

  @IsOptional()
  @IsString()
  image_url?: string;

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
