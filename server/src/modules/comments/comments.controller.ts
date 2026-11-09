import { Controller, Get, Post, Body, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async getByPattern(@Query('patternId') patternId: string) {
    const data = await this.commentsService.findByPattern(patternId);
    return {
      success: true,
      data,
      total: data.length,
      message: 'Lấy danh sách bình luận thành công',
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCommentDto: CreateCommentDto) {
    const data = await this.commentsService.create(createCommentDto);
    return {
      success: true,
      data,
      message: 'Gửi bình luận thành công!',
    };
  }
}

