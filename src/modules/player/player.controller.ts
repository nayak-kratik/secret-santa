import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { PlayerService } from './player.service';
import { Player } from './player.entity';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED) // explicitly sets status code
  async create(@Body() createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    return await this.playerService.create(createPlayerDTO);
  }

  @Get()
  async findAll(): Promise<Player[]> {
    return this.playerService.findall();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Player> {
    return this.playerService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<Player> {
    return this.playerService.update(id, updatePlayerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.playerService.remove(id);
  }
}
