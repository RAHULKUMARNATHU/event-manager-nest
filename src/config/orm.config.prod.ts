import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EventEntity } from 'src/modules/event/entities/event.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: 'Admin@123',
    database: process.env.DB_NAME,
    entities: [EventEntity],
    synchronize: false,
    dropSchema: false,
  }),
);
