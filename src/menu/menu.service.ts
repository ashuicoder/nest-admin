import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { MenuModel } from './entities/menu.entity';
import { InjectModel } from '@nestjs/sequelize';
import { QueryMenuDto } from './dto/query-menu.dto';
import { IPageRes } from 'src/types';
import { generateUniqueCode, listToTree, type TreeNode } from 'src/utils';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuModel)
    private menuModel: typeof MenuModel,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const data: CreateMenuDto = createMenuDto;
    const code = generateUniqueCode();
    if (data.pid !== 0) {
      const parentMenu = await this.menuModel.findByPk(data.pid);
      if (!parentMenu) {
        throw new HttpException('父级菜单不存在', HttpStatus.BAD_REQUEST);
      }
    }
    const menu = await this.menuModel.findOne({
      where: {
        code,
      },
    });
    if (menu) {
      throw new HttpException('菜单编码重复', HttpStatus.BAD_REQUEST);
    }
    data.code = code;
    return this.menuModel.create(data);
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
  async tree() {
    const menus = await this.menuModel.findAll({});
    const menuTree = listToTree(
      menus.map((item) => item.dataValues) as TreeNode[],
    );
    return menuTree;
  }

  async menuTree() {
    const menus = await this.menuModel.findAll({
      where: {
        type: 1,
      },
    });
    const menuTree = listToTree(
      menus.map((item) => item.dataValues) as TreeNode[],
    );
    return menuTree;
  }

  async buttons(id: number) {
    const menu = await this.menuModel.findByPk(id);
    if (!menu) {
      throw new HttpException('菜单不存在', HttpStatus.BAD_REQUEST);
    }

    return this.menuModel.findAll({
      where: {
        type: 2,
        pid: id,
      },
    });
  }
}
