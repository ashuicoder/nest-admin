import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MenuModel } from './entities/menu.entity';

@Module({
  imports: [SequelizeModule.forFeature([MenuModel])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
