import {
  Controller,
  Post,
  Get,
  Body,
  Headers,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authService.login(loginDto);
    return {
      success: true,
      data,
      message: 'Đăng nhập trang quản trị thành công!',
    };
  }

  @Get('me')
  async getProfile(@Headers('authorization') authHeader?: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Chưa đăng nhập');
    }
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    const user = await this.authService.validateToken(token);
    return {
      success: true,
      data: user,
      message: 'Xác thực tài khoản thành công',
    };
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout() {
    return {
      success: true,
      message: 'Đăng xuất thành công',
    };
  }
}
