import {
  Column,
  Model,
  Table,
  AllowNull,
  Unique,
  IsEmail,
} from 'sequelize-typescript';

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
}
