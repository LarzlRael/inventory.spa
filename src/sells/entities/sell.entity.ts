import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { User, SellDetail, Client } from '../../entities';

@Entity('sells')
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

  @ManyToOne(() => Client, (client) => client.sells)  // Relación con la entidad Client
  @JoinColumn({ name: 'idCliente' })  // Nombre de la columna de clave foránea
  client: Client;
}
