import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchDTO {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  giftExchangeId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  giverId: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  receiverId: number;
}
