// role_users/role_user.model.ts
import { Column, Table, Model, ForeignKey } from 'sequelize-typescript';
import { RoleModel } from 'src/role/entities/role.entity'; // 引入UserModel表，
import { UserModel } from 'src/user/entities/user.entity'; // 引入UserModel表，注意：Role表等下再建立哈
@Table({
  tableName: 'role_user', // 数据库中有改该表
})
export class RoleUserModel extends Model<RoleUserModel> {
  @ForeignKey(() => UserModel)
  @Column
  user_id: number; // 外键user_id关联到UserModel表中的主键id

  @ForeignKey(() => RoleModel)
  @Column
  role_id: number;
}
