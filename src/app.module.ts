import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import * as entities from './entities';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminGroupsModule } from './admin-groups/admin-groups.module';
import { ControllersModule } from './controllers/controllers.module';
import { AdminResourcesModule } from './admin-resources/admin-resources.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRoot({
      type: 'mongo',
      clientUrl: new ConfigService().get<string>('DB_URL'),
      dbName: 'wtfcms',
      entities: entities.entityAll(),
      debug: true,
      // baseDir: __dirname
    }),
    AuthModule,
    UsersModule,
    AdminUsersModule,
    AdminGroupsModule,
    ControllersModule,
    AdminResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
