import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDTO } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDTO) {}
