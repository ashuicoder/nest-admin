import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModel } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { QueryRoleDto } from './dto/query-role.dto';
import { IPageRes } from 'src/types';
import { RoleBindMenusDto } from './dto/bind-menus.dto';
import { MenuModel } from 'src/menu/entities/menu.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = await this.roleModel.findOne({
      where: {
        name: createRoleDto.name,
      },
    });
    if (role) {
      throw new HttpException('角色名已存在', HttpStatus.BAD_REQUEST);
    }
    return this.roleModel.create(createRoleDto);
  }

  async findAll(body: QueryRoleDto) {
    const current = body.current;
    const size = body.size;
    delete body.current;
    delete body.size;
    console.log(body);
    const { count: total, rows: users } = await this.roleModel.findAndCountAll({
      limit: size,
      offset: (current - 1) * size,
      where: {
        ...body,
      },
    });
    const res: IPageRes<RoleModel> = {
      current,
      size,
      total,
      pages: Math.ceil(total / size),
      records: users,
    };
    return res;
  }

  async findOne(id: number) {
    const user = await this.roleModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const user = await this.roleModel.findByPk(id);
    if (!user) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    return this.roleModel.update(updateRoleDto, { where: { id } });
  }

  remove(id: number) {
    return this.roleModel.destroy({ where: { id } });
  }

  async bindMenus(id: number, roleBindMenusDto: RoleBindMenusDto) {
    const user = await this.roleModel.findByPk(id);

    if (!user) {
      throw new HttpException('角色不存在', HttpStatus.BAD_REQUEST);
    }
    const menus = await MenuModel.findAll({
      where: { id: roleBindMenusDto.menus },
    });
    await user.$remove('menus', user.id);
    return user.$set('menus', menus);
  }
}
