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
  tableName: 'emoji',
  modelName: 'Emoji',
})
export class Emoji extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column
  declare id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare emojiCode: string;
}
