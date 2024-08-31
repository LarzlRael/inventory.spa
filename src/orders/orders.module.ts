import { Module } from '@nestjs/common';

import { OrdersService } from './services/orders.service';
import {
  OrdersController,
  OrdersDetailController,
  SuppliersControllers,
} from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder, Order, Supplier } from './entities';
import { OrdersDetailService, SupplierService } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([DetailOrder, Order, Supplier])],
  controllers: [OrdersController, OrdersDetailController, SuppliersControllers],
  providers: [OrdersService, SupplierService, OrdersDetailService],
})
export class OrdersModule {}
