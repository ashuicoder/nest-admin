import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuModel } from './entities/menu.entity';
import { InjectModel } from '@nestjs/sequelize';
import { QueryMenuDto } from './dto/query-menu.dto';
import { IPageRes } from 'src/types';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuModel)
    private menuModel: typeof MenuModel,
  ) {}

  create(createMenuDto: CreateMenuDto) {
    return this.menuModel.create(createMenuDto);
  }

  async findAll(body: QueryMenuDto) {
    const current = body.current;
    const size = body.size;
    delete body.current;
    delete body.size;
    const { count: total, rows: users } = await this.menuModel.findAndCountAll({
      limit: size,
      offset: (current - 1) * size,
      where: {
        ...body,
      },
    });
    const res: IPageRes<MenuModel> = {
      current,
      size,
      total,
      pages: Math.ceil(total / size),
      records: users,
    };
    return res;
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
