import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftExchange } from './gift-exchange.entity';
import { GiftExchangeController } from './gift-exchange.controller';
import { GiftExchangeService } from './gift-exchange.service';
import { User } from '../user/user.entity';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftExchange, User, ExclusionRule])],
  controllers: [GiftExchangeController],
  providers: [GiftExchangeService],
})
export class GiftExchangeModule {}
