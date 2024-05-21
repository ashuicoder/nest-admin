import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  create(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }
}