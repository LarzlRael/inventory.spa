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
import { Client } from '../../entities';
import { RentalDetail } from './rental-detail.entity';

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

  @ManyToOne(() => Client, client => client.rentals)
  client: Client;

  @OneToMany(() => RentalDetail, detail => detail.rental)
  details: RentalDetail[];
}
