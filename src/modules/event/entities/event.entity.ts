import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, BaseEntity } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity({ name: 'event' })
export class EventEntity {
  @ApiProperty({ description: 'Primary key as User Id', example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Here add event name',
    example: 'Birthday celebration',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'give a small description',
    example: 'there is a celebration for birthday',
  })
  @Column()
  description: string;

  @ApiProperty({ description: 'date of event', example: '12-05-22' })
  @Column()
  when: Date;

  @ApiProperty({
    description: 'add event location here ',
    example: 'Hazaribagh',
  })
  @Column()
  address: string;
}
