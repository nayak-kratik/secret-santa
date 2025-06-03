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
import { User } from '../user/user.entity';
import { Participant } from '../participant/participant.entity';
import { ExclusionRule } from '../exclusion-rule/exclusion-rule.entity';
import { Match } from '../matches/match.entity';

@Entity()
export class GiftExchange {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30, nullable: false })
  name: string;

  @Column({ length: 100, nullable: true })
  description: string;

  @Column('decimal', { default: 0 })
  budget: number;

  @ManyToOne((_type) => User, (user) => user.gift_exchanges, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'created_by' }) // The foreign key column in the table will be created_by.
  createdBy: User;

  @OneToMany((_type) => Participant, (participant) => participant.gift_exchange)
  participants: Participant[];

  @OneToMany((_type) => ExclusionRule, (exclusion_rule) => exclusion_rule.gift_exchange)
  exclusion_rules: ExclusionRule[]; // Each exchange can have multiple exclusions

  @OneToMany(() => Match, (match) => match.gift_exchange)
  matches: Match[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
