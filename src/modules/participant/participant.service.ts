import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { In, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateParticipantDTO } from './dto/create-participant.dto';

@Injectable()
export class ParticipantService {
  constructor(
    @InjectRepository(Participant)
    private readonly participantRepository: Repository<Participant>,

    @InjectRepository(GiftExchange)
    private readonly exchangeRepository: Repository<GiftExchange>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createParticipantDTO: CreateParticipantDTO): Promise<Participant[]> {
    const { giftExchangeId, userIds } = createParticipantDTO;

    // Check if either user or exchang is null
    const exchange = await this.exchangeRepository.findOne({ where: { id: giftExchangeId } });
    if (!exchange) throw new NotFoundException('Gift exchange not found');

    // Fetch all users by IDs
    const users = await this.userRepository.findBy({ id: In(userIds) });
    if (users.length !== userIds.length) {
      throw new NotFoundException('One or more users not found');
    }

    // Create participants for each user
    const participants = users.map((user) =>
      this.participantRepository.create({
        gift_exchange: exchange,
        user: user,
      }),
    );

    return this.participantRepository.save(participants);
  }

  async findAllByExchangeId(exchangeId: number): Promise<Participant[]> {
    return this.participantRepository.find({
      where: { gift_exchange: { id: exchangeId } },
      relations: ['user'],
    });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: ['gift_exchange', 'user'],
    });
    if (!participant) throw new NotFoundException('Participant not found');
    return participant;
  }

  async remove(id: number): Promise<void> {
    const participant = await this.findOne(id);
    await this.participantRepository.remove(participant);
  }
}
