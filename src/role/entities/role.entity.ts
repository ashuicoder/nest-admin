import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsToMany,
  Default,
  Unique,
} from 'sequelize-typescript';
import { RoleMenuModel } from 'src/common/model/role_menu.model';
import { RoleUserModel } from 'src/common/model/role_user.model';
import { MenuModel } from 'src/menu/entities/menu.entity';
import { UserModel } from 'src/user/entities/user.entity';

@Table({
  modelName: 'Role',
})
export class RoleModel extends Model<RoleModel> {
  @Unique(true)
  @AllowNull(false)
  @Column
  name: string;

  @Default(1)
  @Column
  status: number;

  @BelongsToMany(() => UserModel, () => RoleUserModel)
  users: UserModel[];

  @BelongsToMany(() => MenuModel, () => RoleMenuModel)
  menus: UserModel[];
}
