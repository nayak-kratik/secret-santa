import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateExclusionRuleDTO {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  gift_exchange_id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  participant_id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  excluded_participant_id: number;
}
