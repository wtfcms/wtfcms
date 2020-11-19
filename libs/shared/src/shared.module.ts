import { Module, Global, CacheModule } from '@nestjs/common';
import { SharedService } from './shared.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true
    }),
    // CacheModule.register(),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {}
