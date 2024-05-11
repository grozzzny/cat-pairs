/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Index,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Comment } from './Comment';
import { Emoji } from './Emoji';
import { User } from './User';

@Table({
  timestamps: true,
  tableName: 'commentEmojiUserXRef',
  modelName: 'CommentEmojiUserXRef',
})
export class CommentEmojiUserXRef extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User, 'userId')
  declare user: User;

  @ForeignKey(() => Comment)
  @AllowNull(false)
  @Index
  @Column(DataType.INTEGER)
  commentId!: number;

  @BelongsTo(() => Comment, 'commentId')
  declare comment: Comment;

  @ForeignKey(() => Emoji)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  emojiId!: number;

  @BelongsTo(() => Emoji, 'emojiId')
  declare emoji: Emoji;
}
