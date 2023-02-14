import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, BaseEntity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity({ name: 'event' })
export class EventEntity {
  @ApiProperty({ description: 'Primary key as User Id', example: 1 })
  @Column()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  when: Date;

  @Column()
  address: string;
}
