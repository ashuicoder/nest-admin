import { Module } from '@nestjs/common';

import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';

import { UserModel } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';

const { database } = config;
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: database.host,
      port: database.port,
      username: database.user,
      password: database.password,
      database: database.database,
      timezone: '+08:00',
      autoLoadModels: true,
      sync: {
        alter: true,
      },
      models: [UserModel],
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
