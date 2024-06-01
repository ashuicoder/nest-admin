import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('menus')
  getAuthMenus(@Req() request: Request) {
    return this.authService.getAuthMenus(request);
  }

  @Public()
  @Post('code')
  getAuthCode() {
    return this.authService.getAuthCode();
  }
}
