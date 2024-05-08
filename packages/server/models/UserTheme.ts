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
import { User } from './User';
import { SiteTheme } from './SiteTheme';

@Table({
  timestamps: true,
  tableName: 'user_theme',
  modelName: 'UserTheme',
})
export class UserTheme extends Model<UserTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @ForeignKey(() => SiteTheme)
  @Index
  @Column
  declare themeId: number;

  @BelongsTo(() => SiteTheme, 'themeId')
  declare theme?: SiteTheme;

  @ForeignKey(() => User)
  @Index
  @AllowNull(false)
  @Column(DataType.INTEGER)
  userId!: number;

  @BelongsTo(() => User, 'userId')
  declare user: User;
}
