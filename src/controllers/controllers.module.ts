import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { SystemConfig } from 'src/entities/SystemConfig';
import { ApiController } from './index/api.controller';
import { AdminUser } from 'src/entities';

@Module({
  imports: [
    MikroOrmModule.forFeature([SystemConfig]),
    JwtModule.register({}),
    MikroOrmModule.forFeature([AdminUser]),
  ],
  controllers: [ApiController],
  providers: [JwtStrategy],
})
export class ControllersModule {}
