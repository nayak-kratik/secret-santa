import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GiftExchange } from 'src/modules/gift-exchanges/gift-exchange.entity';
import { Participant } from 'src/modules/participants/participant.entity';
import { User } from 'src/modules/user/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // Database type
  host: 'localhost', // Database host
  port: 5432, // Default PostgreSQL port
  username: process.env.PG_UNAME, // Replace with your PostgreSQL username
  password: process.env.PG_PW, // Replace with your PostgreSQL password
  database: process.env.PG_DB, // Replace with your PostgreSQL database name
  autoLoadEntities: true, // Automatically load entities
  synchronize: process.env.NODE_ENV === 'development' ? true : false, // Auto-sync schema (disable in production)
  entities: [User, GiftExchange, Participant],
};
