import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SystemConfig } from 'src/entities/SystemConfig';
import { ApiController } from './index/api.controller';

@Module({
  imports: [MikroOrmModule.forFeature([SystemConfig])],
  controllers: [ApiController],
})
export class ControllersModule {}
