import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pattern, PatternSchema } from './schemas/pattern.schema';
import { PatternsService } from './patterns.service';
import { PatternsController } from './patterns.controller';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pattern.name, schema: PatternSchema }]),
    CategoriesModule,
  ],
  controllers: [PatternsController],
  providers: [PatternsService],
  exports: [PatternsService],
})
export class PatternsModule {}

