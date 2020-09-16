import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { AdminGroup, AdminResource, AdminUser } from 'src/entities';
import { AdminResourcesController } from './admin-resources.controller';
import { AdminResourcesService } from './admin-resources.service';

@Module({
  imports: [MikroOrmModule.forFeature([AdminResource, AdminUser, AdminGroup])],
  controllers: [AdminResourcesController],
  providers: [AdminResourcesService],
})
export class AdminResourcesModule {}
