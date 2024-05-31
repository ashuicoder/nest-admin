import {
  Column,
  Model,
  Table,
  AllowNull,
  Unique,
  IsEmail,
  BelongsToMany,
  Default,
} from 'sequelize-typescript';
import { RoleUserModel } from 'src/common/model/role_user.model';
import { RoleModel } from 'src/role/entities/role.entity';

@Table({
  modelName: 'User',
  // timestamps: true,
})
export class UserModel extends Model<UserModel> {
  @AllowNull(false)
  @Unique(true)
  @Column
  account: string;

  @AllowNull(false)
  @Column
  username: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  photoUrl: string;

  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  phone: string;

  @Default(false)
  @Column
  enable: boolean;

  @BelongsToMany(() => RoleModel, () => RoleUserModel)
  roles: RoleModel[];
}
