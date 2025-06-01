import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';
import { MatchController } from './match.controller';
import { MatchService } from './match.service';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { User } from '../user/user.entity';
import { Participant } from '../participant/participant.entity';
import { Match } from './match.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftExchange, Participant, User, Match, ExclusionRule])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}
