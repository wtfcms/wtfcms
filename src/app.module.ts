import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import * as entities from './entities';
import { AdminModule } from './admin/admin.module';
import { ApiModule } from './api/api.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl: (new ConfigService()).get<string>('DB_URL'),
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
