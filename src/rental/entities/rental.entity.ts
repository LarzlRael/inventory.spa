import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Client, Product } from '../../entities';
import { User } from '../../users/entities/user.entity';

@Entity('rental')
export class Rental {
  @PrimaryGeneratedColumn()
  idSell: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sellDate: Date;

  @Column()
  totalPrice: number;

  @Column({ nullable: true })
  clientName: string;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ManyToOne(() => User, (user) => user.rentals)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @ManyToOne(() => Client, (client) => client.sells) // Relación con la entidad Client
  @JoinColumn({ name: 'id_client' }) // Nombre de la columna de clave foránea
  client: Client;

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

  @ManyToOne(() => Product, (product) => product.rentals, { eager: true })
  product: Product;
}
