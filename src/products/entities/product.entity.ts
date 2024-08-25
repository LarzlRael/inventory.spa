import { SellDetail } from 'src/sells/entities/sellDetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

/* ID_Producto(PK);
Nombre;
Descripción;
Precio_Compra;
Precio_Venta;
Cantidad_Stock;
ID_Categoria(FK);
ID_Proveedor(FK); */
import { Category } from './category.entity';

@Entity({ name: 'Products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
  @JoinColumn({ name: 'idCategoria' })
  category: Category;
}
