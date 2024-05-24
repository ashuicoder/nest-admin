import { Controller, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Public } from 'src/common/decorator';
import { QueryUserDto } from './dto/query-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('add')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('list')
  findAll(@Body() body: QueryUserDto) {
    return this.userService.findAll(body);
  }

  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.userService.findOne(id);
  }

  @Post('update/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
