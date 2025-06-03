import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDTO } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Get('exchange/:exchangeId')
  async findByExchange(@Param('exchangeId', ParseIntPipe) exchangeId: number) {
    return this.matchService.findByExchange(exchangeId);
  }
}
