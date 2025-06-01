import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { GiftExchange } from '../gift-exchange/gift-exchange.entity';

@Entity()
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20, nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @OneToMany((_type) => GiftExchange, (gift_exchange) => gift_exchange.createdBy)
  gift_exchanges: GiftExchange[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  modified_at: Date;
}
