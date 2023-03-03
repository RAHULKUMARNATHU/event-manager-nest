import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EventEntity } from './event.entity';

export enum AttendeeAnswerEnum {
  Accepted = 1,
  Maybe,
  Rejected,
}

@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => EventEntity, (event) => event.attendees, { nullable: false })
  @JoinColumn()
  event: EventEntity;

  @Column('enum', {
    enum: AttendeeAnswerEnum,
    default: AttendeeAnswerEnum.Accepted,
  })
  answer: AttendeeAnswerEnum;
}
