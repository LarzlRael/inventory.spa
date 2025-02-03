import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentalController } from './rental.controller';
import { Rental } from './entities/rental.entity';
import { RentalService } from './services/rental.service';
import { RentalDetailService } from './services/rental-detail.service';
import { RentalDetail } from './entities/rental-detail.entity';
import { InventoryMovementModule } from '../inventory/inventory.module';

import { UsersModule } from '../users/users.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental, RentalDetail]),
    InventoryMovementModule,
    ProductsModule,
    UsersModule,
  ],
  controllers: [RentalController],
  providers: [RentalService, RentalDetailService],
})
export class RentalModule {}
