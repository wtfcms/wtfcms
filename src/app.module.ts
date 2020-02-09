import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MikroOrmModule } from 'nestjs-mikro-orm';
import { BaseEntity, AdminUser } from './entities';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl:
        'mongodb://doracms2:200E1B291Bae06@139.199.152.88:27017/doracms2',
      dbName: 'doracms2',
      entities: [BaseEntity, AdminUser],
      entitiesDirsTs: ['src/entities'],
      entitiesDirs: ['dist/entities'],
      // baseDir: __dirname
    }),
    AdminModule,
    ApiModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
