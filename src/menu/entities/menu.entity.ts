import { Column, Model, Table, AllowNull } from 'sequelize-typescript';

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

  @AllowNull(false)
  @Column
  status: number;
}
