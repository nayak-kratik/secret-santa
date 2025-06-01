import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftExchangeDTO } from './dto/create-gift-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { GiftExchange } from './gift-exchange.entity';
import { Player } from '../player/player.entity';

@Injectable()
export class GiftExchangeService {
  constructor(
    @InjectRepository(GiftExchange)
    private readonly giftExchangeRepository: Repository<GiftExchange>,
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>,
  ) {}

  async create(createGiftExchangeDTO: CreateGiftExchangeDTO): Promise<GiftExchange> {
    const { createdById, ...giftExchangeData } = createGiftExchangeDTO;

    // Fetch player by ID from CreateGiftExchangeDTO
    const player = await this.playerRepository.findOneBy({ id: createdById });
    if (!player) throw new NotFoundException('Player not found');

    // Create GiftExchange entity
    const giftExchange = this.giftExchangeRepository.create({
      ...giftExchangeData,
      createdBy: player,
    });
    return this.giftExchangeRepository.save(giftExchange);
  }

  async findAll(): Promise<GiftExchange[]> {
    return this.giftExchangeRepository.find();
  }

  async findOne(id: number): Promise<GiftExchange> {
    const giftExchange = await this.giftExchangeRepository.findOneBy({ id });
    if (!giftExchange) throw new NotFoundException('GiftExchange not found');
    return giftExchange;
  }

  async update(id: number, updateDto: Partial<CreateGiftExchangeDTO>): Promise<GiftExchange> {
    const giftExchange = await this.findOne(id);
    Object.assign(giftExchange, updateDto);
    return this.giftExchangeRepository.save(giftExchange);
  }

  async remove(id: number): Promise<void> {
    const giftExchange = await this.findOne(id);
    await this.giftExchangeRepository.remove(giftExchange);
  }
}
