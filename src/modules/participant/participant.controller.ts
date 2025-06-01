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

@Controller('participants')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createParticipantDTO: CreateParticipantDTO) {
    return this.participantService.create(createParticipantDTO);
  }

  @Get()
  async findAll() {
    return this.participantService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.participantService.remove(id);
  }
}
