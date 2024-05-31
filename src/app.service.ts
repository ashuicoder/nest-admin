import { Injectable } from '@nestjs/common';
import config from './config';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  upload(file: Express.Multer.File) {
    return `http://localhost:${config.port}/uploads/${file.filename}`;
  }
}
