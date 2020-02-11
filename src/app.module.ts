import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import * as entities from './entities';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl:
        '',
      dbName: 'doracms2',
      entities: entities.entityAll(),
      entitiesDirsTs: ['src/entities'],
      entitiesDirs: ['dist/entities'],
      // baseDir: __dirname
    }),
    AdminModule,
    ApiModule,
    ServicesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
