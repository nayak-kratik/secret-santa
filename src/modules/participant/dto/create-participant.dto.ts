import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateParticipantDTO {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // <-- This will convert string to number
  giftExchangeId: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number) // <-- This will convert string to number
  userId: number;
}
