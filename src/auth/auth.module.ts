import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModel } from 'src/user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const';
import { AuthGuard } from './auth.gaurd';
import { APP_GUARD } from '@nestjs/core';
import { AuthModel } from './entities/auth.entity';
import { MenuModel } from 'src/menu/entities/menu.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, AuthModel, MenuModel]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: 60 * 60 * 24 * 7 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
