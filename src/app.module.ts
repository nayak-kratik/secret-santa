import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from './modules/player/player.module';
import { GiftExchangeModule } from './modules/gift-exchange/gift-exchange.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }), // Makes ConfigModule available everywhere
    PlayerModule,
    GiftExchangeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
