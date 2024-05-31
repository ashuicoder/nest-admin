// role_users/role_user.model.ts
import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { MenuModel } from 'src/menu/entities/menu.entity';
import { RoleModel } from 'src/role/entities/role.entity'; // 引入UserModel表，; // 引入UserModel表，注意：Role表等下再建立哈
@Table({
  tableName: 'role_menu',
})
export class RoleMenuModel extends Model<RoleMenuModel> {
  @ForeignKey(() => MenuModel)
  @Column
  menu_id: number; // 外键user_id关联到UserModel表中的主键id

  @ForeignKey(() => RoleModel)
  @Column
  role_id: number;
}
