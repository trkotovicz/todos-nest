import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: process.env.ENV === 'test' ? '.env.test' : '.env',
});

const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity.js'],
  migrationsRun: true,
  migrations: [`${__dirname}/migrations/**/*.ts`],
};

export const dataSource = new DataSource(options);
