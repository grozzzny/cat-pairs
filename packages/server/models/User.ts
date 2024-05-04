/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'Users',
})
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;
  @AllowNull(false)
  @Unique
  @Column({
    type: DataType.STRING,
  })
  declare userName: string;
}
