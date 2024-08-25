import { SellDetail } from '../../sells/entities/sellDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Category, User } from '../../entities';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  purchasePrice: number;

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
}
