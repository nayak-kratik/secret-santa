import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGiftExchangeDTO {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  budget: number;
}
