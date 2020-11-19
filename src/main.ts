import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationOptions } from '@app/shared';
import { TransformInterceptor } from '@app/shared/interceptors/transform.interceptor';
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 注意 enableCors 与 useStaticAssets 先后顺序
  app.enableCors();
  app.useStaticAssets(path.join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });
  // see https://github.com/nestjs/nest/issues/2157
  app.setBaseViewsDir('views');
  app.setViewEngine('njk');
  nunjucks.configure('src/views', {
    autoescape: true,
    express: app,
    watch: true,
  });

  app.use(
    session({
      secret: 'wtfcms',
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apiapi', app, document);

  app.useGlobalPipes(new ValidationPipe(ValidationOptions));
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(4000);
}
bootstrap();
