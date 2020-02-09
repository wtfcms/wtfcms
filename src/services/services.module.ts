import { Module } from '@nestjs/common';
import { MikroOrmModule } from 'nestjs-mikro-orm';

import { AdminUserService } from './admin-user/admin-user.service';

import { AdminUser } from '../entities'

@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: [AdminUser]
    }),
  ],
  providers: [AdminUserService],
  exports: [AdminUserService]
})
export class ServicesModule { }
