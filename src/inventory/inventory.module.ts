import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryMovement } from './entities/inventory-movements.entity';
import { InventoryController } from './inventory.controller';
import { Product } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMovement, Product])],
  controllers: [InventoryController],
  providers: [InventoryService],
  exports: [InventoryService],
})
export class InventoryMovementModule {}
