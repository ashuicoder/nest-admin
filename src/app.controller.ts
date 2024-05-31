import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

@Controller('/basic')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'public/uploads'),
        filename: (req, file, cb) => {
          const filename = `${Date.now()}${extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.appService.upload(file);
  }
}
