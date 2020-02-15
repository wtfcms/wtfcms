import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('apiapi', app, document);

  // see https://docs.nestjs.com/techniques/validation
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      forbidUnknownValues: true
    }),
  );

  await app.listen(3000);
}
bootstrap();
