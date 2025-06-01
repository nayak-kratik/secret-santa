import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateGiftExchangeDTO {
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  name: string;

  @IsString()
  @IsOptional() // description is nullable in entity
  @MaxLength(100)
  description?: string;

  @IsNumber()
  @IsOptional() // budget has default 0 in entity
  budget?: number;

  @IsInt()
  @IsNotEmpty()
  createdById: number; // The User ID who created this exchange
}
