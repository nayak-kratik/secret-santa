import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateParticipantDTO } from './create-participant.dto';

export class UpdateParticipantDTO extends PartialType(
  OmitType(CreateParticipantDTO, ['giftExchangeId', 'userId'] as const),
) {}
