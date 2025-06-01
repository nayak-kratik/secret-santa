import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftExchange } from './gift-exchange.entity';
import { GiftExchangeController } from './gift-exchange.controller';
import { GiftExchangeService } from './gift-exchange.service';
import { Player } from '../player/player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GiftExchange, Player])],
  controllers: [GiftExchangeController],
  providers: [GiftExchangeService],
})
export class GiftExchangeModule {}
