import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { LoginAuthDto } from './dto/login-auth.dto';
import { UserModel } from 'src/user/entities/user.entity';
import { comparePassword } from 'src/utils';
import { JwtService } from '@nestjs/jwt';

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
}
