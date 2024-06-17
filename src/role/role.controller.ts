import { Controller, Post, Body, Param } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { QueryRoleDto } from './dto/query-role.dto';
import { RoleBindMenusDto } from './dto/bind-menus.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('角色相关')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '新增角色' })
  @Post('add')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: '角色列表' })
  @Post('list')
  findAll(@Body() body: QueryRoleDto) {
    return this.roleService.findAll(body);
  }

  @ApiOperation({ summary: '角色详情' })
  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @ApiOperation({ summary: '更新角色' })
  @Post('update/:id')
  update(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiOperation({ summary: '删除角色' })
  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }

  @ApiOperation({ summary: '角色绑定菜单' })
  @Post('bind/menus/:id')
  bindMenus(
    @Param('id') id: number,
    @Body()
    body: RoleBindMenusDto,
  ) {
    return this.roleService.bindMenus(id, body);
  }
}
