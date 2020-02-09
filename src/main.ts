import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(path.join(__dirname, '..', 'public'));
  // see https://github.com/nestjs/nest/issues/2157
  // app.setBaseViewsDir('views');
  // app.setViewEngine('nunjucks');
  nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true,
  });

  await app.listen(3000);
}
bootstrap();
