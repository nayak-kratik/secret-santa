import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDTO } from './dto/create-match.dto';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(GiftExchange)
    private readonly giftExchangeRepository: Repository<GiftExchange>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
  ) {}

  async create(createMatchDTO: CreateMatchDTO): Promise<Match> {
    const { giftExchangeId, giverId, receiverId } = createMatchDTO;

    // Validate and fetch giftExchange
    const giftExchange = await this.giftExchangeRepository.findOneBy({ id: giftExchangeId });
    if (!giftExchange) throw new NotFoundException('GiftExchange not found');

    // Validate and fetch giver participant
    const giver = await this.participantRepository.findOneBy({ id: giverId });
    if (!giver) throw new NotFoundException('Giver participant not found');

    // Validate and fetch receiver participant
    const receiver = await this.participantRepository.findOneBy({ id: receiverId });
    if (!receiver) throw new NotFoundException('Receiver participant not found');

    // Create Match entity with validated relations
    const match = this.matchRepository.create({
      gift_exchange: giftExchange,
      giver,
      receiver,
    });

    return this.matchRepository.save(match);
  }

  async findAll(): Promise<Match[]> {
    return this.matchRepository.find({ relations: ['giftExchange', 'giver', 'receiver'] });
  }

  async findByExchange(exchangeId: number): Promise<Match[]> {
    return this.matchRepository.find({
      where: { gift_exchange: { id: exchangeId } },
      relations: ['giver', 'receiver'],
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.matchRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Match not found');
    }
  }
}
