import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './modules/categories/categories.module';
import { PatternsModule } from './modules/patterns/patterns.module';
import { ProductsModule } from './modules/products/products.module';
import { BlogsModule } from './modules/blogs/blogs.module';
import { CommentsModule } from './modules/comments/comments.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri:
          configService.get<string>('MONGODB_URI') ||
          'mongodb://localhost:27017/chart_crochet_db',
      }),
      inject: [ConfigService],
    }),
    CategoriesModule,
    PatternsModule,
    ProductsModule,
    BlogsModule,
    CommentsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}

