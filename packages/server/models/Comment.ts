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
import { Topic } from './Topic';
import { Reply } from './Reply';
import { User } from './User';

@Table({
  timestamps: true,
  tableName: 'comments',
  modelName: 'Comment',
})
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => Topic)
  @Column
  declare topicId: number;
  @BelongsTo(() => Topic)
  topic!: Topic;

  @ForeignKey(() => User)
  @Column
  declare userId: number;
  @BelongsTo(() => User)
  user!: User;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  declare text: string;

  @HasMany(() => Reply)
  declare replys: Reply[];
}
