import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

import { encrypPasswod } from 'src/utils';

import { UserModel } from './entities/user.entity';
import { IPageRes } from 'src/types';
import { UserBindRolesDto } from './dto/bind-roles.dto';
import { RoleModel } from 'src/role/entities/role.entity';
import { PwdUserDto } from './dto/pwd-user.dto';
import { AuthModel } from 'src/auth/entities/auth.entity';
import * as dayjs from 'dayjs';
import { adminName } from 'src/auth/const';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,

    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.findOne({
      where: {
        account: createUserDto.account,
      },
    });
    if (user) {
      throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST);
    }
    createUserDto.password = await encrypPasswod(createUserDto.password);
    return this.userModel.create(createUserDto);
  }

  async findAll(body: QueryUserDto) {
    const current = body.current;
    const size = body.size;
    delete body.current;
    delete body.size;
    const { count: total, rows: users } = await this.userModel.findAndCountAll({
      limit: size,
      offset: (current - 1) * size,
      attributes: {
        exclude: ['password'],
      },
      where: {
        ...body,
      },
    });
    const res: IPageRes<UserModel> = {
      current,
      size,
      total,
      pages: Math.ceil(total / size),
      records: users,
    };
    return res;
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.account === adminName) {
      throw new HttpException('admin账号不能编辑', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (user.account === adminName) {
      throw new HttpException('admin账号不能删除', HttpStatus.BAD_REQUEST);
    }
    return this.userModel.destroy({ where: { id } });
  }

  async bindRoles(id: number, userBindRolesDto: UserBindRolesDto) {
    const user = await this.userModel.findByPk(id);

    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    if (user.account === adminName) {
      throw new HttpException('admin账号不能定角色', HttpStatus.BAD_REQUEST);
    }

    const roles = await RoleModel.findAll({
      where: { id: userBindRolesDto.roles },
    });
    await user.$remove('roles', user.id);
    return user.$set('roles', roles);
  }

  async updatePwd(id: number, pwdUserDto: PwdUserDto) {
    const { validId, answer } = pwdUserDto;

    const validInfo = await this.authModel.findByPk(validId);

    if (!validInfo || validInfo.answer !== answer) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    } else if (dayjs().diff(dayjs(validInfo.createdAt), 'minute') > 5) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    this.authModel.destroy({ where: { id: validId } });

    const pwd = await encrypPasswod(pwdUserDto.pwd);
    await this.userModel.update(
      { password: pwd },
      {
        where: {
          id,
        },
      },
    );

    return true;
  }
}
