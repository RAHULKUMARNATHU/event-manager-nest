import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, BaseEntity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity({ name: 'event' })
export class Event extends BaseEntity {
  @ApiProperty({ description: 'Primary key as User Id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: string;

  @Column()
  address: string;
}
