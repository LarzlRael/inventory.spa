import { Rental } from '../../rental/entities/rental.entity';
import { RentalDetail } from '../../rental/entities/rental-detail.entity';
import { InventoryMovement } from '../../inventory/entities/inventory-movements.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
import { SellDetail } from '../../sells/entities/sell.detail.entity';
import { Category } from './category.entity';
import { User } from '../../users/entities/user.entity';
import { Supplier } from '../../supplier/entities/suppliers.entity';
import { DetailOrder } from '../../orders/entities/order.detail.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @OneToMany(() => SellDetail, (sellDetail) => sellDetail.product)
  sellDetails: SellDetail[];

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

  @OneToMany(() => RentalDetail, (rentalDetail) => rentalDetail.product)
  rentalDetails: RentalDetail[];

  @OneToOne(() => Inventory, (inventory) => inventory.product)
  @JoinColumn()
  inventory: Inventory;

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
