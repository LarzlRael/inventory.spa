import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product, Sell } from '../../entities';

@Entity('sell_detail')
export class SellDetail {
  @PrimaryGeneratedColumn()
  idDetail: number;

  @Column()
  quantitySold: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceSale: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Product, (product) => product.sellDetails)
  @JoinColumn({ name: 'id_product' })
  product: Product;

  @ManyToOne(() => Sell, (sell) => sell.sellDetail)
  @JoinColumn({ name: 'id_sell' })
  sell: Sell;

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
