import { Controller, Post, Body, Param, ParseArrayPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { Public } from 'src/common/decorator';
import { QueryUserDto } from './dto/query-user.dto';
import { UserBindRolesDto } from './dto/bind-roles.dto';
import { PwdUserDto } from './dto/pwd-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户相关')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: '新增用户' })
  // @Public()
  @Post('add')
  create(
    @Body()
    body: CreateUserDto,
  ) {
    return this.userService.create(body);
  }

  @ApiOperation({ summary: '查询用户列表' })
  @Post('list')
  findAll(@Body() body: QueryUserDto) {
    return this.userService.findAll(body);
  }

  @ApiOperation({ summary: '查询用户详情' })
  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: '更新用户' })
  @Post('update/:id')
  update(
    @Param('id') id: number,
    @Body(new ParseArrayPipe({ items: UpdateUserDto }))
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: '删除用户' })
  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: '绑定角色' })
  @Post('bind/roles/:id')
  bindRoles(
    @Param('id') id: number,
    @Body()
    body: UserBindRolesDto,
  ) {
    return this.userService.bindRoles(id, body);
  }

  @ApiOperation({ summary: '修改密码' })
  @Post('updatePwd/:id')
  updatePwd(
    @Param('id') id: number,

    @Body()
    body: PwdUserDto,
  ) {
    return this.userService.updatePwd(id, body);
  }
}
