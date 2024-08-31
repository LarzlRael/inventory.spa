import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Order ,Product } from '../../entities';


@Entity()
export class DetailOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order) => order.detailOrders)
  order: Order;

  @ManyToOne(() => Product, (product) => product.detailOrders)
  product: Product;
}