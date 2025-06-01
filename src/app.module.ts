import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { GiftExchangeModule } from './modules/gift-exchange/gift-exchange.module';
import { ParticipantModule } from './modules/participant/participant.module';
import { ExclusionRuleModule } from './modules/exclusion-rule/exclusion-rule.module';
import { MatchModule } from './modules/matches/match.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot({ isGlobal: true }), // Makes ConfigModule available everywhere
    UserModule,
    GiftExchangeModule,
    ParticipantModule,
    ExclusionRuleModule,
    MatchModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
