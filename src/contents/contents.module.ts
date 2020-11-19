import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Content, ContentCategory, ContentTag } from 'src/entities';
import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';

@Module({
  imports: [MikroOrmModule.forFeature([Content, ContentCategory, ContentTag])],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
