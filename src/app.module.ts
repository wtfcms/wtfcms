import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from 'nestjs-mikro-orm';
import * as entities from './entities';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminGroupsModule } from './admin-groups/admin-groups.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl: new ConfigService().get<string>('DB_URL'),
      dbName: 'wtfcms',
      entities: entities.entityAll(),
      entitiesDirsTs: ['src/entities'],
      entitiesDirs: ['dist/entities'],
      // baseDir: __dirname
    }),
    AdminModule,
    AuthModule,
    UsersModule,
    AdminUsersModule,
    AdminGroupsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
