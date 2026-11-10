import {
  Injectable,
  UnauthorizedException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { User, UserDocument } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  private hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
  }

  // Tự động khởi tạo tài khoản Admin mặc định khi khởi động server
  async onModuleInit() {
    const adminExists = await this.userModel.findOne({ username: 'admin' });
    if (!adminExists) {
      const defaultAdmin = new this.userModel({
        username: 'admin',
        password_hash: this.hashPassword('admin123'),
        full_name: 'Quản Trị Viên Tiệm Len Xinh',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin_master',
      });
      await defaultAdmin.save();
      console.log('🛡️ Đã tự động tạo tài khoản Admin mặc định (admin / admin123)');
    }
  }

  async login(dto: LoginDto): Promise<{
    token: string;
    user: {
      id: string;
      username: string;
      full_name: string;
      role: string;
      avatar: string;
    };
  }> {
    const username = dto.username.toLowerCase().trim();
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    const inputHash = this.hashPassword(dto.password);
    // Hỗ trợ cả hash SHA256 lẫn fallback cho dữ liệu cũ nếu có
    if (user.password_hash !== inputHash && user.password_hash !== dto.password) {
      throw new UnauthorizedException('Tên đăng nhập hoặc mật khẩu không chính xác');
    }

    // Sinh Session Token cho Admin
    const payload = `${user._id}:${user.username}:${Date.now()}`;
    const token = `adm_${Buffer.from(payload).toString('base64')}`;

    return {
      token,
      user: {
        id: user._id.toString(),
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar,
      },
    };
  }

  async validateToken(token: string): Promise<any> {
    if (!token || !token.startsWith('adm_')) {
      throw new UnauthorizedException('Phiên đăng nhập không hợp lệ');
    }

    try {
      const raw = Buffer.from(token.replace('adm_', ''), 'base64').toString('utf-8');
      const [id, username] = raw.split(':');
      const user = await this.userModel.findOne({ username });
      if (!user) {
        throw new UnauthorizedException('Tài khoản không tồn tại');
      }
      return {
        id: user._id.toString(),
        username: user.username,
        full_name: user.full_name,
        role: user.role,
        avatar: user.avatar,
      };
    } catch {
      throw new UnauthorizedException('Phiên đăng nhập đã hết hạn');
    }
  }
}
