import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UserModel } from 'src/user/entities/user.entity';
import { comparePassword, encrypPasswod } from 'src/utils';
import { JwtService } from '@nestjs/jwt';
import { MenuModel } from 'src/menu/entities/menu.entity';
import { AuthModel } from './entities/auth.entity';

import { AlgebraicCaptcha } from 'algebraic-captcha';
import * as dayjs from 'dayjs';
import { PwdAuthDto } from './dto/pwd-auth.dto';
import { Status } from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,

    @InjectModel(AuthModel)
    private authModel: typeof AuthModel,

    @InjectModel(MenuModel)
    private menuModel: typeof MenuModel,

    private jwtService: JwtService,
  ) {}
  async login(loginAuthDto: LoginAuthDto) {
    const { account, validId, answer } = loginAuthDto;

    const validInfo = await this.authModel.findByPk(validId);

    if (!validInfo || validInfo.answer !== answer) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    } else if (dayjs().diff(dayjs(validInfo.createdAt), 'minute') > 5) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userModel.findOne({
      where: {
        account,
      },
    });
    if (!user) {
      throw new HttpException('用户或密码错误', HttpStatus.BAD_REQUEST);
    }
    const res = await comparePassword(loginAuthDto.password, user.password);
    if (!res) {
      throw new HttpException('用户或密码错误', HttpStatus.BAD_REQUEST);
    }
    this.authModel.destroy({ where: { id: validId } });
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

    if (user.account === 'admin') {
      return this.menuModel.findAll({
        where: {
          status: Status.Enabal,
        },
      });
    }

    const roles = await user.$get('roles');

    const menus: MenuModel[] = [];

    for (let i = 0; i < roles.length; i++) {
      const menu = await roles[i].$get('menus', {
        where: {
          status: Status.Enabal,
        },
      });
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

  async getAuthCode() {
    const algebraicCaptcha = new AlgebraicCaptcha({
      width: 200,
      height: 200,
      background: '#ffffff',
      noise: 1,
      minValue: 1,
      maxValue: 10,
      operandAmount: 1,
      operandTypes: ['+', '-'],
      mode: 'formula',
      targetSymbol: '?',
    });

    const { image, answer } = await algebraicCaptcha.generateCaptcha();
    const validInfo = await this.authModel.create({
      answer,
    });
    return {
      validId: validInfo.id,
      image,
    };
  }

  async updatePwd(request: Request, pwdAuthDto: PwdAuthDto) {
    const { validId, answer } = pwdAuthDto;

    const validInfo = await this.authModel.findByPk(validId);

    if (!validInfo || validInfo.answer !== answer) {
      throw new HttpException('验证码错误', HttpStatus.BAD_REQUEST);
    } else if (dayjs().diff(dayjs(validInfo.createdAt), 'minute') > 5) {
      throw new HttpException('验证码已过期', HttpStatus.BAD_REQUEST);
    }

    const userId = request['user'].sub;

    const user = await this.userModel.findByPk(userId);
    if (!user) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }

    const res = await comparePassword(pwdAuthDto.oldPwd, user.password);
    if (!res) {
      throw new HttpException('老密码错误', HttpStatus.BAD_REQUEST);
    }

    const res1 = await comparePassword(pwdAuthDto.pwd, user.password);
    if (res1) {
      throw new HttpException('新密码不能和老密码相同', HttpStatus.BAD_REQUEST);
    }

    const newPwdCryped = await encrypPasswod(pwdAuthDto.pwd);
    await this.userModel.update(
      { password: newPwdCryped },
      {
        where: {
          id: userId,
        },
      },
    );

    this.authModel.destroy({ where: { id: validId } });

    return true;
  }
}
