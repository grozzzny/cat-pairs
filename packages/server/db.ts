import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config({ path: '../../.env' });

const {
  POSTGRES_DB,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PORT,
} = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  models: [__dirname + '/models'],
};
const sequelize = new Sequelize(sequelizeOptions);
export default sequelize;
