import {
  Check,
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

@Check(`"participant_id" <> "excluded_participant_id"`)
// Make sure that participant_id != excluded_participant_id
@Unique(['participant', 'excluded_participant', 'gift_exchange'])
// Make sure that same exclusion rule is not replated

@Entity()
export class ExclusionRule {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((_type) => GiftExchange, (gift_exchange) => gift_exchange.exclusion_rules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'gift_exchange_id' })
  gift_exchange: GiftExchange;

  @ManyToOne((_type) => Participant, (participant) => participant.exclusion_rules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'participant_id' })
  participant: Participant;

  @ManyToOne((_type) => Participant, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'excluded_participant_id' })
  excluded_participant: Participant;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
