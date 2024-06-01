import { Column, Model, Table, AllowNull } from 'sequelize-typescript';

@Table({
  modelName: 'Auth',
})
export class AuthModel extends Model<AuthModel> {
  @AllowNull(false)
  @Column
  answer: number;
}
