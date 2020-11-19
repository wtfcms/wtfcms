import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ContentCategory } from 'src/entities';
import { ContentCategoriesController } from './content-categories.controller';
import { ContentCategoriesService } from './content-categories.service';

@Module({
  imports: [MikroOrmModule.forFeature([ContentCategory])],
  controllers: [ContentCategoriesController],
  providers: [ContentCategoriesService],
})
export class ContentCategoriesModule {}
