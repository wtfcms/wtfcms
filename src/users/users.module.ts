import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import * as entities from '../entities';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: entities.entityInclude(['User']),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
