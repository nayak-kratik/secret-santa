import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';

@Unique(['gift_exchange', 'giver'])
@Entity()
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => GiftExchange, (gift_exchange) => gift_exchange.matches, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gift_exchange_id' })
  gift_exchange: GiftExchange;

  @ManyToOne((_type) => Participant, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'giver_id' })
  giver: Participant;

  @ManyToOne((_type) => Participant, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'receiver_id' })
  receiver: Participant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
