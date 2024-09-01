import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Product } from '../../entities';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  contactName: string;

  @Column({
    nullable: true,
  })
  contactPhone: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column({
    nullable: true,
  })
  notes: string;

  @OneToMany(() => Product, (product) => product.supplier)
  products: Product[];
}
