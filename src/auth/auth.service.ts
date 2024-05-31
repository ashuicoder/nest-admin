import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UserModel } from 'src/user/entities/user.entity';
import { comparePassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { CreateMenuDto } from 'src/menu/dto/create-menu.dto';
import { MenuModel } from 'src/menu/entities/menu.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.userModel.findOne({
      where: {
        account: loginAuthDto.account,
      },
    });
    if (!user) {
      throw new HttpException('用户或密码错误', HttpStatus.BAD_REQUEST);
    }
    const res = await comparePassword(loginAuthDto.password, user.password);
    if (!res) {
      throw new HttpException('用户或密码错误', HttpStatus.BAD_REQUEST);
    }

    const payload = { sub: user.id };
    return {
      token: await this.jwtService.signAsync(payload, {}),
    };
  }

  async getAuthMenus(requst: Request) {
    const userId = requst['user'].sub;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    const roles = await user.$get('roles');

    const menus: MenuModel[] = [];

    for (let i = 0; i < roles.length; i++) {
      const menu = await roles[i].$get('menus');
      menus.push(...(menu as any));
    }

    const idMap = new Map();

    const filterMenus = menus.filter((item) => {
      if (idMap.has(item.id)) {
        return false;
      }
      idMap.set(item.id, true);
      return true;
    });

    return filterMenus;
  }
}
