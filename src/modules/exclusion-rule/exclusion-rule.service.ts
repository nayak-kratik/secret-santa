import { Repository } from 'typeorm';
import { ExclusionRule } from './exclusion-rule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';
import { CreateExclusionRuleDTO } from './dto/create-exclusion-rule.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class ExclusionRuleService {
  constructor(
    @InjectRepository(ExclusionRule)
    private exclusionRuleRepo: Repository<ExclusionRule>,

    @InjectRepository(GiftExchange)
    private giftExchangeRepo: Repository<GiftExchange>,

    @InjectRepository(Participant)
    private participantRepo: Repository<Participant>,
  ) {}

  async createMany(dtos: CreateExclusionRuleDTO[]): Promise<ExclusionRule[]> {
    const results: ExclusionRule[] = [];
    for (const dto of dtos) {
      const { gift_exchange_id, participant_id, excluded_participant_id } = dto;
      if (participant_id === excluded_participant_id) {
        throw new BadRequestException('A participant cannot exclude themselves.');
      }

      const giftExchange = await this.giftExchangeRepo.findOneBy({ id: gift_exchange_id });
      if (!giftExchange) throw new NotFoundException('Gift Exchange not found');

      const participant = await this.participantRepo.findOne({
        where: { id: participant_id },
        relations: ['gift_exchange'],
      });
      const excludedParticipant = await this.participantRepo.findOne({
        where: { id: excluded_participant_id },
        relations: ['gift_exchange'],
      });

      if (!participant || !excludedParticipant) {
        throw new NotFoundException('Participant(s) not found');
      }

      if (
        participant.gift_exchange.id !== gift_exchange_id ||
        excludedParticipant.gift_exchange.id !== gift_exchange_id
      ) {
        throw new BadRequestException('Both participants must belong to the same gift exchange.');
      }

      const existing = await this.exclusionRuleRepo.findOne({
        where: {
          gift_exchange: { id: gift_exchange_id },
          participant: { id: participant_id },
          excluded_participant: { id: excluded_participant_id },
        },
      });
      if (existing) {
        throw new BadRequestException('This exclusion rule already exists.');
      }

      const exclusionRule = this.exclusionRuleRepo.create({
        gift_exchange: giftExchange,
        participant,
        excluded_participant: excludedParticipant,
      });
      results.push(await this.exclusionRuleRepo.save(exclusionRule));
    }
    return results;
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
