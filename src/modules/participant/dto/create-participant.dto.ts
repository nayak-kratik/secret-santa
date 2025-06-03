import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateParticipantDTO {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // <-- This will convert string to number
  giftExchangeId: number;

  @IsNotEmpty()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number) // <-- This will convert string to number
  userIds: number[];
}
