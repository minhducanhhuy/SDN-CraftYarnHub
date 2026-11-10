import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Cấu hình phục vụ static assets (ảnh sản phẩm, chart, blog từ client/public)
  const clientPublic = join(__dirname, '..', '..', 'client', 'public');
  app.useStaticAssets(clientPublic);

  // Cấu hình Global Prefix cho toàn bộ REST API
  app.setGlobalPrefix('api');

  // Kích hoạt Global Validation Pipe cho DTO
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Bật CORS cho phép React Vite (port 5173) gọi API
  const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  app.enableCors({
    origin: [clientUrl, 'http://localhost:5173', 'http://127.0.0.1:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`🚀 NestJS Server đang chạy tại: http://localhost:${port}/api`);
}

bootstrap();

