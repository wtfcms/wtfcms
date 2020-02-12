import { Module } from '@nestjs/common';
import { AdminGroupsController } from './admin-groups.controller';
import { AdminGroupsService } from './admin-groups.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import * as entities from '../entities'


@Module({
  imports: [
    MikroOrmModule.forFeature({
      entities: entities.entityInclude([
        'AdminGroup',
      ]),
    }),
  ],
  controllers: [AdminGroupsController],
  providers: [AdminGroupsService]
})
export class AdminGroupsModule { }
