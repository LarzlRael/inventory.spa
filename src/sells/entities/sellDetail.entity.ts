import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sell } from './sell.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('detalles_venta')
export class SellDetail {
  @PrimaryGeneratedColumn()
  idDetail: number;

  @Column()
  quantitySold: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceSale: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Sell, (sell) => sell.sellDetail)
  @JoinColumn({ name: 'idVenta' })
  sell: Sell;

  @ManyToOne(() => Product, (producto) => producto.sellDetails)
  @JoinColumn({ name: 'idProducto' })
  product: Product;
}
