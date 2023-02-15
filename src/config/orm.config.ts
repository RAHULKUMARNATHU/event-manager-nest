import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Profile } from './../auth/profile.entity';
// import { User } from './../auth/user.entity';
// import { Attendee } from './../events/attendee.entity';
import { EventEntity } from 'src/modules/event/entities/event.entity';
// import { Subject } from './../school/subject.entity';
// import { Teacher } from './../school/teacher.entity';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD ||  'Admin@123',
    database: process.env.DB_NAME,
    entities: [EventEntity],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
