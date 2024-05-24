import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleModel } from './entities/role.entity';
import { InjectModel } from '@nestjs/sequelize';
import { QueryRoleDto } from './dto/query-role.dto';
import { IPageRes } from 'src/types';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel,
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  async findAll(body: QueryRoleDto) {
    const current = body.current;
    const size = body.size;
    delete body.current;
    delete body.size;
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
}
