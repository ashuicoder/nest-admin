import { Controller, Post, Body, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('菜单相关')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @ApiOperation({ summary: '新增菜单' })
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({ summary: '获取菜单列表' })
  @Post('list')
  findAll(@Body() body: QueryMenuDto) {
    return this.menuService.findAll(body);
  }

  @ApiOperation({ summary: '获取菜单详情' })
  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @ApiOperation({ summary: '更新菜单' })
  @Post('update/:id')
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @ApiOperation({ summary: '删除菜单' })
  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }

  @ApiOperation({ summary: '获取完整菜单树,包含按钮' })
  @Post('tree')
  tree() {
    return this.menuService.tree();
  }

  @ApiOperation({ summary: '获取完整菜单树,不包含按钮' })
  @Post('treeMenu')
  menuTree() {
    return this.menuService.tree();
  }

  @ApiOperation({ summary: '根据菜单获取按钮列表' })
  @Post('buttons/:id')
  buttons(@Param('id') id: number) {
    return this.menuService.buttons(id);
  }
}
