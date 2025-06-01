import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';
import { ExclusionRuleService } from './exclusion-rule.service';
import { ExclusionRuleController } from './exclusion-rule.controller';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftExchange, Participant, ExclusionRule])],
  controllers: [ExclusionRuleController],
  providers: [ExclusionRuleService],
})
export class ExclusionRuleModule {}
