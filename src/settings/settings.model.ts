import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Settings extends Model<Settings> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  data_type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  account_id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    field: 'created_at',
    type: DataType.DATE,
  })
  createdAt: Date;

  @Column({
    field: 'updated_at',
    type: DataType.DATE,
  })
  updatedAt: Date;

  @Column({
    field: 'deleted_at',
    type: DataType.DATE,
  })
  deletedAt: Date;
}
