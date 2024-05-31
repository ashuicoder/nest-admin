import { IsArray, IsNumber } from 'class-validator';

export class RoleBindMenusDto {
  @IsArray()
  @IsNumber({}, { each: true })
  menus: number[];
}
