import { Controller, Post, Body, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { QueryMenuDto } from './dto/query-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @Post('list')
  findAll(@Body() body: QueryMenuDto) {
    return this.menuService.findAll(body);
  }

  @Post('detail/:id')
  findOne(@Param('id') id: number) {
    return this.menuService.findOne(id);
  }

  @Post('update/:id')
  update(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(id, updateMenuDto);
  }

  @Post('delete/:id')
  remove(@Param('id') id: number) {
    return this.menuService.remove(id);
  }

  @Post('tree')
  tree() {
    return this.menuService.tree();
  }
}
