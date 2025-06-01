import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GiftExchange } from '../gift-exchanges/gift-exchange.entity';
import { Participant } from '../participants/participant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToMany((_type) => GiftExchange, (gift_exchange) => gift_exchange.createdBy)
  gift_exchanges: GiftExchange[];

  @OneToMany((_type) => Participant, (participant) => participant.user)
  participants: Participant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
