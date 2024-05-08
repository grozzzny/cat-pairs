/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  HasOne,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { UserTheme } from './UserTheme';

@Table({
  timestamps: true,
  tableName: 'site_theme',
  modelName: 'SiteTheme',
})
export class SiteTheme extends Model<SiteTheme> {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare theme: string;

  @HasOne(() => UserTheme)
  declare userTheme: UserTheme;
}
