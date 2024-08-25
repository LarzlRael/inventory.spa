import { Sell, Product } from '../../entities';

import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true, default: 'web' })
  authStrategy: string;

  @Column({
    nullable: true,
  })
  phone: number;

  @OneToMany(() => Sell, (sell) => sell.user)
  sells: Sell[];

  @OneToMany(() => Product, (product) => product.addedBy)
  products: Product[]; // Productos agregados por el usuario
}
