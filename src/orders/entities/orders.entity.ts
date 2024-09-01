import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { DetailOrder, User } from '../../entities';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => DetailOrder, (detailOrder) => detailOrder.order)
  detailOrders: DetailOrder[];

  @ManyToOne(() => User, (user) => user.orders) // Relación correcta con User
  user: User;
}