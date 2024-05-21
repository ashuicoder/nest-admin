import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuModel } from './entities/menu.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuModel)
    private menuModel: typeof MenuModel,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  findAll() {
    return `This action returns all menu`;
  }

  async findOne(id: number) {
    const user = await this.menuModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    const user = await this.menuModel.findByPk(id);
    if (!user) {
      throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
    }
    return this.menuModel.update(updateMenuDto, { where: { id } });
  }

  remove(id: number) {
    return this.menuModel.destroy({ where: { id } });
  }
}
