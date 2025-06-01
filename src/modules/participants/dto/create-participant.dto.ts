import { IsEmail, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateParticipantDTO {
  @IsNotEmpty()
  @IsInt()
  giftExchangeId: number;

  @IsNotEmpty()
  @IsInt()
  userId: number;
}
