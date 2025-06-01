import { Injectable } from '@nestjs/common';
import { CreateGiftExchangeDTO } from './dto/create-gift-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { GiftExchange } from './gift-exchange.entity';

@Injectable()
export class GiftExchangeService {
  constructor(
    @InjectRepository(GiftExchange)
    private readonly giftExchangeRepository: Repository<GiftExchange>,
  ) {}

  async create(createGiftExchangeDTO: CreateGiftExchangeDTO): Promise<GiftExchange> {
    const giftExchange = this.giftExchangeRepository.create(createGiftExchangeDTO);
    return this.giftExchangeRepository.save(giftExchange);
  }
}
