/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

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
  theme!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string;
}
