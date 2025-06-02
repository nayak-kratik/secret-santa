import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';
import { Participant } from '../participant/participant.entity';

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
    nullable: false,
  })
  role: UserRole;

  @OneToMany((_type) => GiftExchange, (gift_exchange) => gift_exchange.createdBy)
  gift_exchanges: GiftExchange[];

  @OneToMany((_type) => Participant, (participant) => participant.user)
  participants: Participant[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
