import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from './match.entity';
import { Repository } from 'typeorm';
import { CreateMatchDTO } from './dto/create-match.dto';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(GiftExchange)
    private readonly giftExchangeRepository: Repository<GiftExchange>,
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,
    @InjectRepository(ExclusionRule)
    private readonly exclusionRuleRepository: Repository<ExclusionRule>,
  ) {}

  async create(createMatchDTO: CreateMatchDTO): Promise<Match> {
    const { giftExchangeId, giverId, receiverId } = createMatchDTO;

    // Validate and fetch giftExchange
    const giftExchange = await this.giftExchangeRepository.findOneBy({ id: giftExchangeId });
    if (!giftExchange) throw new NotFoundException('GiftExchange not found');

    // Validate and fetch giver participant
    const giver = await this.participantRepository.findOne({
      where: { id: giverId },
      relations: ['gift_exchange'],
    });
    if (!giver) throw new NotFoundException('Giver participant not found');

    // Validate and fetch receiver participant
    const receiver = await this.participantRepository.findOne({
      where: { id: receiverId },
      relations: ['gift_exchange'],
    });
    if (!receiver) throw new NotFoundException('Receiver participant not found');

    // nforce both participants belong to the same exchange as the giftExchange
    if (
      giver.gift_exchange.id !== giftExchange.id ||
      receiver.gift_exchange.id !== giftExchange.id
    ) {
      throw new BadRequestException('Giver and receiver must belong to the same gift exchange');
    }

    // Create Match entity with validated relations
    const match = this.matchRepository.create({
      gift_exchange: giftExchange,
      giver,
      receiver,
    });

    return this.matchRepository.save(match);
  }

  async findByExchange(exchangeId: number): Promise<any[]> {
    const matches = await this.matchRepository.find({
      where: { gift_exchange: { id: exchangeId } },
      relations: ['giver', 'giver.user', 'receiver', 'receiver.user'],
    });

    // Map to include name and email
    return matches.map((match) => ({
      id: match.id,
      giver: {
        id: match.giver.id,
        name: match.giver.user?.name,
        email: match.giver.user?.email,
      },
      receiver: {
        id: match.receiver.id,
        name: match.receiver.user?.name,
        email: match.receiver.user?.email,
      },
    }));
  }

  async generateAndSaveMatches(exchangeId: number) {
    // 1. Fetch all participants for the exchange
    const participants = await this.participantRepository.find({
      where: { gift_exchange: { id: exchangeId } },
      relations: ['user'],
    });

    // 2. Fetch all exclusions for the exchange
    const exclusions = await this.exclusionRuleRepository.find({
      where: { gift_exchange: { id: exchangeId } },
      relations: ['gift_exchange', 'participant', 'excluded_participant'],
    });

    // 3. Run your matching algorithm (implement logic to respect exclusions)
    const matches = this.generateMatches(participants, exclusions);
    if (!matches) {
      throw new BadRequestException('No valid match assignment possible with current exclusions.');
    }

    const giftExchange = await this.giftExchangeRepository.findOneBy({ id: exchangeId });
    if (!giftExchange) throw new NotFoundException('GiftExchange not found');

    // Remove old matches for this exchange (optional, if you want to overwrite)
    await this.matchRepository.delete({ gift_exchange: { id: exchangeId } });

    const matchesToSave: Match[] = [];
    for (const [giverId, receiverId] of matches) {
      const giver = participants.find((p) => p.id === giverId);
      const receiver = participants.find((p) => p.id === receiverId);
      if (!giver || !receiver) continue;

      matchesToSave.push(
        this.matchRepository.create({
          gift_exchange: giftExchange,
          giver,
          receiver,
        }),
      );
    }
    const savedMatches = await this.matchRepository.save(matchesToSave);

    // 5. Return the saved matches
    // return savedMatches;
    return savedMatches;
  }

  private generateMatches(participants, exclusions) {
    // Get array of participant IDs
    const participantIds = participants.map((p) => p.id);

    // Get array of exclusion pairs: { participantId, excludedParticipantId }
    const exclusionPairs = exclusions.map((e) => ({
      participantId: e.participant.id,
      excludedParticipantId: e.excluded_participant.id,
    }));

    // Check if one participant is excluded from giving to another
    const isExcluded = (giver: number, receiver: number): boolean => {
      return exclusionPairs.some(
        ({ participantId, excludedParticipantId }) =>
          (giver === participantId && receiver === excludedParticipantId) ||
          (receiver === participantId && giver === excludedParticipantId),
      );
    };

    const assignedGiftees = new Set<number>(); // Keep track of people who already got gifts
    const assignments: [number, number][] = []; // Final result [gifter, giftee]

    for (const gifter of participantIds) {
      let foundGiftee = false;

      for (const giftee of participantIds) {
        // Skip if:
        // - same person
        // - giftee already assigned to someone
        // - exclusion rule applies
        if (giftee === gifter || assignedGiftees.has(giftee) || isExcluded(gifter, giftee)) {
          continue;
        }

        // Found a valid giftee
        assignments.push([gifter, giftee]);
        assignedGiftees.add(giftee);
        foundGiftee = true;
        break;
      }

      // If no giftee could be found for a gifter, the assignment fails
      if (!foundGiftee) {
        return null;
      }
    }
    return assignments;
  }
}
