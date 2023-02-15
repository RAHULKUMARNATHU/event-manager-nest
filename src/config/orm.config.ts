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
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    // entities: [Event, Attendee, Subject, Teacher, User, Profile],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
