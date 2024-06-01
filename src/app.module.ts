import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';

import config from './config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';

import { UserModule } from './user/user.module';
import { UserModel } from './user/entities/user.entity';

import { AuthModule } from './auth/auth.module';

import { RoleModule } from './role/role.module';
import { RoleModel } from './role/entities/role.entity';

import { MenuModule } from './menu/menu.module';
import { MenuModel } from './menu/entities/menu.entity';

import { RoleUserModel } from 'src/common/model/role_user.model';
import { RoleMenuModel } from './common/model/role_menu.model';
import { join } from 'path';
import { AuthModel } from './auth/entities/auth.entity';

const { database } = config;
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'), // 使用绝对路径到你的静态文件夹
    }),
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
      models: [
        UserModel,
        MenuModel,
        RoleModel,
        RoleUserModel,
        RoleMenuModel,
        AuthModel,
      ],
    }),
    UserModule,
    AuthModule,
    RoleModule,
    MenuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
