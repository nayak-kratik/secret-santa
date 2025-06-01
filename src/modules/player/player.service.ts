import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/create-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './player.entity';
import { Repository } from 'typeorm';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayerService {
  constructor(
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createPlayerDTO: CreatePlayerDTO): Promise<Player> {
    const player = this.playerRepository.create(createPlayerDTO);
    return this.playerRepository.save(player);
  }

  async findall(): Promise<Player[]> {
    return this.playerRepository.find();
  }

  async findOne(id: number): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id });
    if (!player) throw new NotFoundException('Player Not Found');
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.findOne(id);
    if (!player) throw new NotFoundException('Player Not Found');
    Object.assign(player, updatePlayerDto);
    return this.playerRepository.save(player);
  }

  async remove(id: number): Promise<void> {
    const player = await this.findOne(id);
    await this.playerRepository.remove(player);
  }
}
