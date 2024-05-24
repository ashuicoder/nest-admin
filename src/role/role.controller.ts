import { Controller, Post, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Post('list')
  findAll(@Body() body: QueryRoleDto) {
    return this.roleService.findAll(body);
  }

  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Post('update/:id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
