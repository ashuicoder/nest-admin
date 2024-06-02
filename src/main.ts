import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './config';
import { ResponseInterceptor } from './common/interceptor/global-response.intercepter';
import { GlabalExceptionFilter } from './common/filter/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new GlabalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('后台模板开发文档')
    .setDescription('后台模板开发文档')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
