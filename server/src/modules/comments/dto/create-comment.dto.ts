import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'ID Chart không được để trống' })
  @IsString()
  pattern_id: string;

  @IsNotEmpty({ message: 'Họ tên người đánh giá không được để trống' })
  @IsString()
  author_name: string;

  @IsNumber()
  @Min(1, { message: 'Đánh giá tối thiểu 1 sao' })
  @Max(5, { message: 'Đánh giá tối đa 5 sao' })
  rating: number;

  @IsNotEmpty({ message: 'Nội dung đánh giá không được để trống' })
  @IsString()
  content: string;
}
