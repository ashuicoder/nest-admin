import { Controller, Post, Body, Param, ParseArrayPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorator';
import { QueryUserDto } from './dto/query-user.dto';
import { UserBindRolesDto } from './dto/bind-roles.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('add')
  create(
    @Body()
    body: CreateUserDto,
  ) {
    return this.userService.create(body);
  }

  @Post('list')
  findAll(@Body() body: QueryUserDto) {
    return this.userService.findAll(body);
  }

  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post('update/:id')
  update(
    @Param('id') id: number,
    @Body(new ParseArrayPipe({ items: UpdateUserDto }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Post('bind/roles/:id')
  bindRoles(
    @Param('id') id: number,
    @Body()
    body: UserBindRolesDto,
  ) {
    return this.userService.bindRoles(id, body);
  }
}
