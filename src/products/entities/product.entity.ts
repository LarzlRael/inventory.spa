import { SellDetail } from '../../sells/entities/sellDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category, User, Supplier, DetailOrder } from '../../entities';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  purchasePrice: number;

  /* @Column({ type: 'decimal', precision: 10, scale: 2 })
  suggestedSalePrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  finalSalePrice: number; */

  @Column()
  SalePrice: number;

  @Column()
  stockQuantity: number;

  @OneToMany(() => SellDetail, (sellDetail) => sellDetail.product)
  sellDetails: SellDetail[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'idCategory' })
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'addedBy' }) // Nombre de la columna en la base de datos
  addedBy: User; // Usuario que agregó el producto

  @ManyToOne(() => Supplier, (provider) => provider.products)
  supplier: Supplier;

  @OneToMany(() => DetailOrder, (detailOrder) => detailOrder.product)
  detailOrders: DetailOrder[];
}
