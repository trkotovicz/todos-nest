import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: true,
  logging: true,
  migrationsRun: true,
  migrations: [`${__dirname}/migrations/**/*.ts`],
};

export const dataSource = new DataSource(options);
