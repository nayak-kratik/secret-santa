import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { User } from '../user/user.entity';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';

@Entity()
export class Participant {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => GiftExchange, (gift_exchange) => gift_exchange.participants, {
    nullable: false, // Each participants must belong to a gift exchange
    onDelete: 'CASCADE', // If the gift-exchange is deleted, cascade delete the participant.
  })
  @JoinColumn({ name: 'gift_exchange_id' })
  gift_exchange: GiftExchange;

  @ManyToOne((_type) => User, (user) => user.participants, {
    nullable: false, // Each participants must be a user
    onDelete: 'CASCADE', // If the user is deleted, cascade delete the participant
  })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @OneToMany((_type) => ExclusionRule, (exclusion_rule) => exclusion_rule.participant)
  exclusion_rules: ExclusionRule[]; // Each participant can have multiple exclusion rules

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
