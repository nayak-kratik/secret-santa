import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGiftExchangeDTO } from './dto/create-gift-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { GiftExchange } from './gift-exchange.entity';
import { User } from '../user/user.entity';

@Injectable()
export class GiftExchangeService {
  constructor(
    @InjectRepository(GiftExchange)
    private readonly giftExchangeRepository: Repository<GiftExchange>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createGiftExchangeDTO: CreateGiftExchangeDTO): Promise<GiftExchange> {
    const { createdById, ...giftExchangeData } = createGiftExchangeDTO;

    // Fetch user by ID from CreateGiftExchangeDTO
    const user = await this.userRepository.findOneBy({ id: createdById });
    if (!user) throw new NotFoundException('User not found');

    // Create GiftExchange entity
    const giftExchange = this.giftExchangeRepository.create({
      ...giftExchangeData,
      createdBy: user,
    });
    return this.giftExchangeRepository.save(giftExchange);
  }

  async findAllByUserId(userId: number): Promise<GiftExchange[]> {
    return this.giftExchangeRepository.find({
      where: { createdBy: { id: userId } },
      select: {
        id: true,
        name: true,
        description: true,
        budget: true,
      },
    });
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
