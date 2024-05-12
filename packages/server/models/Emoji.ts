/* eslint-disable indent */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllowNull,
  Column,
  DataType,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

@Table({
  timestamps: false,
  tableName: 'emoji',
  modelName: 'Emoji',
})
export class Emoji extends Model {
  @PrimaryKey
  @Column
  declare id: number;

  @Index
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  declare emojiCode: string;
}
