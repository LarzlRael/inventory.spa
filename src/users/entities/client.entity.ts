import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Rental } from '../../rental/entities/rental.entity';
import { Sell } from '../../sells/entities/sell.entity';

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  phone: number;

  @OneToMany(() => Sell, (sell) => sell.client) // Relación con la entidad Sell
  sells: Sell[];

  @OneToMany(() => Sell, (rental) => rental.client) // Relación con la entidad Sell
  rentals: Rental[];

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}
