import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDTO } from './dto/create-match.dto';

@Controller('matches')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  async create(@Body() dto: CreateMatchDTO) {
    return this.matchService.create(dto);
  }

  @Get()
  async findAll() {
    return this.matchService.findAll();
  }

  @Get('exchange/:exchangeId')
  async findByExchange(@Param('exchangeId', ParseIntPipe) exchangeId: number) {
    return this.matchService.findByExchange(exchangeId);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.matchService.remove(id);
  }
}
