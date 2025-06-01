import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateGiftExchangeDTO } from './create-gift-exchange.dto';

export class UpdateGiftExchangeDto extends PartialType(
  OmitType(CreateGiftExchangeDTO, ['createdById'] as const),
) {}
