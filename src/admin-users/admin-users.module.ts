import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import * as entities from '../entities';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: entities.entityInclude(['AdminUser', 'AdminGroup']),
    }),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
  exports: [AdminUsersService],
})
export class AdminUsersModule {}
