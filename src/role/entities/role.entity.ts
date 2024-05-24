import {
  Column,
  Model,
  Table,
  AllowNull,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoleUserModel } from 'src/common/model/role_user.model';
import { UserModel } from 'src/user/entities/user.entity';

@Table({
  modelName: 'Role',
})
export class RoleModel extends Model<RoleModel> {
  @AllowNull(false)
  @Column
  name: string;

  @BelongsToMany(() => UserModel, () => RoleUserModel)
  users: UserModel[];
}
