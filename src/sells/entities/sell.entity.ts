import { User } from '../../users/entities/user.entity';
import { SellDetail } from './sell.detail.entity';
import { Client } from '../../users/entities/client.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sells')
export class Sell {
  @PrimaryGeneratedColumn()
  idSell: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sellDate: Date;

  @Column()
  totalSale: number;

  @Column({ nullable: true })
  clientName: string;

  @ManyToOne(() => User, (user) => user.sells)
  @JoinColumn({ name: 'id_user' })
  user: User;

  @OneToMany(() => SellDetail, (sellDetail) => sellDetail.sell, {
    cascade: true,
  })
  sellDetail: SellDetail[];

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
}
