import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationOptions } from './shared/config';
const session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // see https://github.com/nestjs/nest/issues/2157
  app.useStaticAssets(path.join(__dirname, '..', 'public'));
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
  app.enableCors();
  await app.listen(4000);
}
bootstrap();
