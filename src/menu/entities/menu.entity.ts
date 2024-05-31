import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsToMany,
  Default,
} from 'sequelize-typescript';
import { RoleMenuModel } from 'src/common/model/role_menu.model';
import { RoleModel } from 'src/role/entities/role.entity';

@Table({
  modelName: 'Menu',
})
export class MenuModel extends Model<MenuModel> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  pid: number;

  @AllowNull(false)
  @Column
  sort: number;

  @AllowNull(false)
  @Column
  code: string;

  @Default(1)
  @Column
  status: number;

  @AllowNull(false)
  @Column
  type: number;

  @BelongsToMany(() => RoleModel, () => RoleMenuModel)
  roles: RoleModel[];
}
