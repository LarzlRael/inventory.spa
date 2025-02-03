import { Module } from '@nestjs/common';

import { OrdersService } from './services/orders.service';
import { OrdersController, OrdersDetailController } from './controllers';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrdersDetailService } from './services';
import { ProductsModule } from '../products/products.module';
import { DetailOrder } from './entities/order.detail.entity';
import { Order } from './entities/orders.entity';
import { Supplier } from '../supplier/entities/suppliers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DetailOrder, Order, Supplier]),
    ProductsModule,
  ],
  controllers: [OrdersController, OrdersDetailController],
  providers: [OrdersService, OrdersDetailService],
})
export class OrdersModule {}
