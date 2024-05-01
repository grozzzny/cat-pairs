import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const { POSTGRES_HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: 5432,
  username: 'postgres',
  password: '625002',
  database: 'postgres',
  dialect: 'postgres',
  models: [__dirname + '/models'],
};
const sequelize = new Sequelize(sequelizeOptions);
export default sequelize;
