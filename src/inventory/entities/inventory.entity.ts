import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { InventoryMovement } from './inventory-movements.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  quantityAvailable: number;

  @Column({ default: 0 })
  quantityReserved: number;

  @OneToOne(() => Product, (product) => product.inventory)
  @JoinColumn()
  product: Product;

  @OneToMany(
    () => InventoryMovement,
    (inventoryMovement) => inventoryMovement.inventory,
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
