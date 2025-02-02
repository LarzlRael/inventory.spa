import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from '../../entities';
import { User } from '../../users/entities/user.entity';

@Entity('inventory_movements')
export class InventoryMovement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movementType: string; // Tipo de movimiento: "entrada", "salida"

  @Column()
  quantity: number; // Cantidad de productos movidos

  @ManyToOne(() => User, (user) => user.inventoryMovements)
  @JoinColumn({ name: 'user_id' }) // Foreign key en la tabla
  user: User;

  @Column()
  reason: string; // Motivo del movimiento (venta, compra, etc.)

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

  @ManyToOne(() => Product, (product) => product.movements)
  @JoinColumn({ name: 'product_id' }) // Relación con la columna 'product_id' en la tabla 'inventory_movements'
  product: Product;
}
