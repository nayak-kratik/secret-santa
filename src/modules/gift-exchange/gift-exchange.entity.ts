import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Player } from '../player/player.entity';

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

  @ManyToOne((_type) => Player, (player) => player.gift_exchanges, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // optional, if you want createdBy always fetched automatically
  })
  @JoinColumn({ name: 'created_by' }) // The foreign key column in the table will be created_by.
  createdBy: Player;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
