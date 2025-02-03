import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Rental } from './rental.entity';
import { Product } from '../../products/entities/product.entity';


@Entity('rental_detail')
export class RentalDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  unitPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  subtotal: number;

  @ManyToOne(() => Rental, rental => rental.details)
  rental: Rental;

  @ManyToOne(() => Product, product => product.rentalDetails)
  product: Product;
}