import { Type } from 'class-transformer';
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
  @Type(() => Number) // <-- This will convert string to number
  budget?: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // <-- This will convert string to number
  createdById: number; // The User ID who created this exchange
}
