import { Controller, Get, Post, Body, Query, HttpStatus, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';

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
  async create(
    @Body()
    body: {
      pattern_id: string;
      author_name: string;
      rating: number;
      content: string;
    },
  ) {
    const data = await this.commentsService.create(body);
    return {
      success: true,
      data,
      message: 'Gửi bình luận thành công!',
    };
  }
}

