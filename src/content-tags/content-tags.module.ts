import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ContentTag } from 'src/entities';
import { ContentTagsController } from './content-tags.controller';

@Module({
  imports: [MikroOrmModule.forFeature([ContentTag])],
  controllers: [ContentTagsController],
})
export class ContentTagsModule {}
