import { Module } from '@nestjs/common';
import { InventoryService } from './services/inventory.service';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryMovement } from './entities/inventory-movements.entity';
import { Inventory } from './entities/inventory.entity';
import { InventoryMovementController } from './controllers/inventory-movement.controller';
import { InventoryController } from './controllers/inventory.controller';

import { InventoryMovementService } from './services/inventory-movement.service';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMovement, Inventory])],
  controllers: [InventoryController, InventoryMovementController],
  providers: [InventoryService, InventoryMovementService],
  exports: [InventoryService, InventoryMovementService],
})
export class InventoryMovementModule {}
