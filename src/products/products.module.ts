import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { OrdersModule } from 'src/orders/orders.module';
import { SuppliersModule } from 'src/supplier/supplier.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category]),SuppliersModule],
  controllers: [ProductsController, CategoryController],
  providers: [ProductsService, CategoryService],
  exports: [ProductsService],
})
export class ProductsModule {}
