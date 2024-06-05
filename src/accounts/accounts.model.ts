import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Account extends Model<Account> {
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
