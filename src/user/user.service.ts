import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryUserDto } from './dto/query-user.dto';

import { encrypPasswod } from 'src/utils';

import { UserModel } from './entities/user.entity';
import { IPageRes } from 'src/types';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
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
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}
