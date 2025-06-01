import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { User } from '../user/user.entity';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant, GiftExchange, User, ExclusionRule])],
  controllers: [ParticipantController],
  providers: [ParticipantService],
})
export class ParticipantModule {}
