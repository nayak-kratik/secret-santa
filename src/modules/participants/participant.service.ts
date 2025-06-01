import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { GiftExchange } from '../gift-exchanges/gift-exchange.entity';
import { Repository } from 'typeorm';
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

  async create(createParticipantDTO: CreateParticipantDTO): Promise<Participant> {
    const [exchange, user] = await Promise.all([
      this.exchangeRepository.findOne({ where: { id: createParticipantDTO.giftExchangeId } }),
      this.userRepository.findOne({ where: { id: createParticipantDTO.userId } }),
    ]);

    if (!exchange || !user) {
      throw new NotFoundException('Either Gift exchange or Participant not found');
    }
    const participant = this.participantRepository.create({
      giftExchange: exchange,
      user: user,
    });
    return this.participantRepository.save(participant);
  }

  async findAll(): Promise<Participant[]> {
    return this.participantRepository.find({ relations: ['giftExchange', 'user'] });
  }

  async findOne(id: number): Promise<Participant> {
    const participant = await this.participantRepository.findOne({
      where: { id },
      relations: ['giftExchange', 'user'],
    });
    if (!participant) throw new NotFoundException('Participant not found');
    return participant;
  }

  async remove(id: number): Promise<void> {
    const participant = await this.findOne(id);
    await this.participantRepository.remove(participant);
  }
}
