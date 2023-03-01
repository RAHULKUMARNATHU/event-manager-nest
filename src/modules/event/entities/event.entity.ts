import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Entity, OneToMany } from 'typeorm';
import { Column } from 'typeorm/decorator/columns/Column';
import { PrimaryGeneratedColumn } from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import { Attendee } from './attendee.entity';

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
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  when: Date;

  @ApiProperty({
    description: 'add event location here ',
    example: 'Hazaribagh',
  })
  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event, {
    // eager:true
    cascade: true,
    // cascade: ['insert', 'update'],
  })
  attendees: Attendee[];
}
