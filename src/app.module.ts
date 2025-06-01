import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GiftExchangeModule } from './modules/gift-exchanges/gift-exchange.module';
import { ParticipantModule } from './modules/participants/participant.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }), // Makes ConfigModule available everywhere
    UserModule,
    GiftExchangeModule,
    ParticipantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
