import { Module } from '@nestjs/common';

import { OrdersService } from './services/orders.service';
import { OrdersController, OrdersDetailController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder, Order, Supplier, Product } from '../entities';
import { OrdersDetailService } from './services';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailOrder, Order, Supplier]),
    ProductsModule,
  ],
  controllers: [OrdersController, OrdersDetailController],
  providers: [OrdersService, OrdersDetailService],
})
export class OrdersModule {}
