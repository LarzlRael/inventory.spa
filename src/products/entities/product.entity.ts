import { Rental } from '../../rental/entities/rental.entity';
import { InventoryMovement } from '../../inventory/entities/inventory-movements.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import {
  Category,
  User,
  Supplier,
  DetailOrder,
  SellDetail,
} from '../../entities';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
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

  @OneToMany(() => Rental, (rental) => rental.product)
  rentals: Rental[];

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'added_by' }) // Nombre de la columna en la base de datos
  addedBy: User; // Usuario que agregó el producto

  @ManyToOne(() => Supplier, (provider) => provider.products)
  supplier: Supplier;

  @OneToMany(() => DetailOrder, (detailOrder) => detailOrder.product)
  detailOrders: DetailOrder[];

  @OneToMany(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.product,
  )
  movements: InventoryMovement[];



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
