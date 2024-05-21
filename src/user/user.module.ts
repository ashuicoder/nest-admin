import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserModel } from './entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
