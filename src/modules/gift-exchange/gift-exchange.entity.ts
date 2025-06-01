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

  @OneToMany((_type) => Participant, (participant) => participant.giftExchange)
  participants: Participant[];

  @ManyToOne((_type) => User, (user) => user.gift_exchanges, {
    nullable: false,
    onDelete: 'CASCADE',
    eager: true, // optional, if you want createdBy always fetched automatically
  })
  @JoinColumn({ name: 'created_by' }) // The foreign key column in the table will be created_by.
  createdBy: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
