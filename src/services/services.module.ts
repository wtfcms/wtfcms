import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import { AdminUserService } from './admin-user/admin-user.service';
import { AdminGroupService } from './admin-group/admin-group.service';
import * as entities from '../entities';

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: entities.entityInclude([
        'AdminUser',
        'AdminGroup',
        'AdminResource',
      ]),
    }),
  ],
  providers: [AdminUserService, AdminGroupService],
  exports: [AdminUserService, AdminGroupService],
})
export class ServicesModule {}
