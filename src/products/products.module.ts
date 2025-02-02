import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';

/* import { InventoryMovement } from 'src/inventory/entities/inventory.entity'; */
import { ProductSubscriber } from './product.subscriber';
import { SuppliersModule } from '../supplier/supplier.module';
import { InventoryMovementModule } from 'src/inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]),
    SuppliersModule,
    InventoryMovementModule,
  ],
  controllers: [ProductsController, CategoryController],
  providers: [ProductsService, CategoryService, ProductSubscriber],
  exports: [ProductsService],
})
export class ProductsModule {}
