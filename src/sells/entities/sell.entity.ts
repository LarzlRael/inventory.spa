import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { SellDetail } from './sellDetail.entity';
import { User } from 'src/users/entities/user.entity';

@Entity('ventas')
export class Sell {
  @PrimaryGeneratedColumn()
  idSell: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  sellDate: Date;

  @Column()
  totalVenta: number;

  @Column()
  clientName: string;

  @ManyToOne(() => User, (usuario) => usuario.sells)
  @JoinColumn({ name: 'idUsuario' })
  user: User;

  @OneToMany(() => SellDetail, (sellDetail) => sellDetail.sell, {
    cascade: true,
  })
  sellDetail: SellDetail[];
}
