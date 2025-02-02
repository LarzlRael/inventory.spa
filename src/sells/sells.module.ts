import { Module } from '@nestjs/common';
import { SellsService } from './sells.service';
import { SellsController } from './sells.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sell } from './entities/sell.entity';
import { SellDetail } from './entities/sell.detail.entity';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/entities/product.entity';
import { UsersModule } from 'src/users/users.module';
import { InventoryMovementModule } from '../inventory/inventory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sell, SellDetail, Product]),
    ProductsModule, // Aquí importamos el módulo Product
    UsersModule,
    InventoryMovementModule,
  ],
  controllers: [SellsController],
  providers: [SellsService],
})
export class SellsModule {}
