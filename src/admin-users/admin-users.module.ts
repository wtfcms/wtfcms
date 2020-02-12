import { Module } from '@nestjs/common';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import * as entities from '../entities';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: entities.entityInclude(['AdminUser']),
    }),
  ],
  controllers: [AdminUsersController],
  providers: [AdminUsersService],
})
export class AdminUsersModule {}
