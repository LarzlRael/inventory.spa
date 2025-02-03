import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { RentalDetail } from './rental-detail.entity';
import { Client } from '../../users/entities/client.entity';

@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @ManyToOne(() => Client, (client) => client.rentals)
  client: Client;

  @OneToMany(() => RentalDetail, (detail) => detail.rental)
  details: RentalDetail[];
}
