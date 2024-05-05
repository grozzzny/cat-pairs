/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/Comment';
import { Topic } from '../models/Topic';
import { Reply } from '../models/Reply';

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
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
  @HasMany(() => Topic)
  declare topics: Topic[];

  @HasMany(() => Comment)
  declare comments: Comment[];

  @HasMany(() => Reply)
  declare replys: Reply[];
}
