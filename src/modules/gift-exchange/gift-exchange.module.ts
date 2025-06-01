import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GiftExchange } from './gift-exchange.entity';
import { GiftExchangeController } from './gift-exchange.controller';
import { GiftExchangeService } from './gift-exchange.service';

@Module({
  imports: [TypeOrmModule.forFeature([GiftExchange])],
  controllers: [GiftExchangeController],
  providers: [GiftExchangeService],
})
export class GiftExchangeModule {}
