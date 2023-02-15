import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString, Length } from 'class-validator';
export class CreateEventDto {
  @ApiProperty({
    description: 'Here add event name',
    example: 'Birthday celebration',
  })
  @IsString()
  @Length(5, 255)
  readonly name: string;

  @ApiProperty({
    description: 'give a small description',
    example: 'there is a celebration for birthday',
  })
  @Length(5, 255)
  readonly description: string;

  @ApiProperty({ description: 'date of event', example: '12-05-22' })
  // @IsDateString()
  readonly when: string;

  @ApiProperty({
    description: 'add event location here ',
    example: 'Hazaribagh',
  })
  @Length(5, 255)
  readonly address: string;
}
