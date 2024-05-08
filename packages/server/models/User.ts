/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Comment } from '../models/Comment';
import { Topic } from '../models/Topic';
import { Reply } from '../models/Reply';
import { UserTheme } from '../models/UserTheme';

import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'users',
  modelName: 'User',
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

  @HasOne(() => UserTheme)
  declare userTheme: UserTheme;
}
