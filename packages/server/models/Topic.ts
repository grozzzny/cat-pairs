/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comment } from '../models/Comment';
import { User } from './User';

@Table({
  timestamps: true,
  tableName: 'topics',
  modelName: 'Topic',
})
export class Topic extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare topicName: string;

  @ForeignKey(() => User)
  @Column
  declare userId: number;
  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare description: string;

  @HasMany(() => Comment)
  declare comments: Comment[];
}
