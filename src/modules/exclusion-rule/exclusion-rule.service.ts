import { Repository } from 'typeorm';
import { ExclusionRule } from './exclusion-rule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';
import { CreateExclusionRuleDTO } from './dto/create-exclusion-rule.dto';
import { NotFoundException } from '@nestjs/common';

export class ExclusionRuleService {
  constructor(
    @InjectRepository(ExclusionRule)
    private exclusionRuleRepo: Repository<ExclusionRule>,

    @InjectRepository(GiftExchange)
    private giftExchangeRepo: Repository<GiftExchange>,

    @InjectRepository(Participant)
    private participantRepo: Repository<Participant>,
  ) {}

  async create(createExclusionRuleDto: CreateExclusionRuleDTO): Promise<ExclusionRule> {
    const { gift_exchange_id, participant_id, excluded_participant_id } = createExclusionRuleDto;
    if (participant_id === excluded_participant_id) {
      throw new Error('A participant cannot exclude themselves.');
    }

    const giftExchange = await this.giftExchangeRepo.findOneBy({ id: gift_exchange_id });
    if (!giftExchange) throw new NotFoundException('Gift Exchange not found');

    const participant = await this.participantRepo.findOneBy({ id: participant_id });
    const excludedParticipant = await this.participantRepo.findOneBy({
      id: excluded_participant_id,
    });

    if (!participant || !excludedParticipant) {
      throw new NotFoundException('Participant(s) not found');
    }

    const exclusionRule = this.exclusionRuleRepo.create({
      gift_exchange: giftExchange,
      participant,
      excluded_participant: excludedParticipant,
    });

    return this.exclusionRuleRepo.save(exclusionRule);
  }

  async findAll(): Promise<ExclusionRule[]> {
    return this.exclusionRuleRepo.find({
      relations: ['gift_exchange', 'participant', 'excluded_participant'],
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.exclusionRuleRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Exclusion rule not found');
  }
}
