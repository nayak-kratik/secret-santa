import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExclusionRule } from 'src/modules/exclusion-rule/exclusion-rule.entity';
import { GiftExchange } from 'src/modules/gift-exchange/gift-exchange.entity';
import { Match } from 'src/modules/matches/match.entity';
import { Participant } from 'src/modules/participant/participant.entity';
import { User } from 'src/modules/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // Database type
  host: process.env.PG_HOST || 'localhost',
  port: Number(process.env.PG_PORT) || 5432, // Default PostgreSQL port
  username: process.env.PG_UNAME,
  password: process.env.PG_PW,
  database: process.env.PG_DB,
  autoLoadEntities: true, // Automatically load entities
  synchronize: process.env.NODE_ENV === 'development' ? true : false, // Auto-sync schema (disable in production)
  entities: [User, GiftExchange, Participant, ExclusionRule, Match],
};
