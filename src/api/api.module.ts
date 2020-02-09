import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [
    ServicesModule
  ],
  controllers: [ApiController],
  providers: [ApiService]
})
export class ApiModule {}
