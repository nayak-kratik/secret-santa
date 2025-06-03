import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDTO } from './dto/create-participant.dto';
import { Participant } from './participant.entity';

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createParticipantDTO: CreateParticipantDTO) {
    return this.participantService.create(createParticipantDTO);
  }

  @Get('exchange/:exchangeId')
  async findAllByExchangeId(
    @Param('exchangeId', ParseIntPipe) exchangeId: number,
  ): Promise<Participant[]> {
    return this.participantService.findAllByExchangeId(exchangeId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}
