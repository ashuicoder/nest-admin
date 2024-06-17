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
    .setTitle('接口文档')
    .setVersion('1.0')
    .setDescription(
      `<ul>
        <li>除上传文件接口外，所有接口的Content-Type为application/json</li>
        <li>本接口文档所有的status字段说明：1为启用状态，2为禁用状态</li>
        <li>所有接口必须以响应状态吗为2开头且code=0才能代表接口请求成功</li>
      </ul>`,
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
