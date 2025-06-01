import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateExclusionRuleDTO {
  @IsInt()
  @IsNotEmpty()
  gift_exchange_id: number;

  @IsInt()
  @IsNotEmpty()
  participant_id: number;

  @IsInt()
  @IsNotEmpty()
  excluded_participant_id: number;
}
