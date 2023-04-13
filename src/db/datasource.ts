import * as dotenv from 'dotenv';
dotenv.config();
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const options: DataSourceOptions = {
  type: 'cockroachdb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '26257'),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  synchronize: false,
  ssl: {
    ca: process.env.SSL_CERT,
  },
  namingStrategy: new SnakeNamingStrategy(),
  entities: [__dirname + '/**/models/**/*.model.{js,ts}'],
  migrations: [__dirname + '/**/migrations/*.{js,ts}'],
  timeTravelQueries: false,
};
const dataSource: DataSource = new DataSource(options);

export default dataSource;
