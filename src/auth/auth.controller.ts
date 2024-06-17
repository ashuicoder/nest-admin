import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorator';
import { PwdAuthDto } from './dto/pwd-auth.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('权限相关')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '用户登陆' })
  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @ApiOperation({ summary: '获取授权菜单列表' })
  @Post('menus')
  getAuthMenus(@Req() request: Request) {
    return this.authService.getAuthMenus(request);
  }

  @ApiOperation({ summary: '获取验证码' })
  @Public()
  @Post('code')
  getAuthCode() {
    return this.authService.getAuthCode();
  }

  @ApiOperation({ summary: '密码修改' })
  @Post('pwd')
  updatePwd(@Req() request: Request, @Body() body: PwdAuthDto) {
    return this.authService.updatePwd(request, body);
  }
}
