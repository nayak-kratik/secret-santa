import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @HttpCode(201) // explicitly sets status code
  async create(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.playerService.create(createPlayerDTO);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findall();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() dto: UpdatePlayerDto): Promise<Player> {
    return this.playerService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.playerService.remove(id);
  }
}
