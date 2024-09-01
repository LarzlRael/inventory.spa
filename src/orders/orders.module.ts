import { Module } from '@nestjs/common';

import { OrdersService } from './services/orders.service';
import {
  OrdersController,
  OrdersDetailController,
  SuppliersControllers,
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder, Order, Supplier, Product } from '../entities';
import { OrdersDetailService, SupplierService } from './services';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [TypeOrmModule.forFeature([DetailOrder, Order, Supplier]), ProductsModule],
  controllers: [OrdersController, OrdersDetailController, SuppliersControllers],
  providers: [OrdersService, SupplierService, OrdersDetailService],
})
export class OrdersModule {}
