import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMatchDTO {
  @IsInt()
  @IsNotEmpty()
  giftExchangeId: number;

  @IsInt()
  @IsNotEmpty()
  giverId: number;

  @IsInt()
  @IsNotEmpty()
  receiverId: number;
}
