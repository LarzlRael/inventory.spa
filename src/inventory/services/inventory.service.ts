import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryDto } from '../dto/inventory.dto';
import { User } from '../../users/entities/user.entity';
import { Inventory } from '../entities/inventory.entity';
import { InventoryMovement } from '../entities/inventory-movements.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async saveInventory(
    product: Product,
    quantityAvailable: number,
  ): Promise<Inventory> {
    const inventory = this.inventoryRepository.create({
      product,
      quantityAvailable,
      quantityReserved: 0,
    });
    return this.inventoryRepository.save(inventory);
  }

  /* async addMovement(
    idInventory: number,
    type: string,
    quantity: number,
    description?: string,
  ): Promise<InventoryMovement> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
    });
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${inventoryId} not found`);
    }

    // Actualizar la cantidad disponible en el inventario
    if (type === 'Entrada') {
      inventory.quantityAvailable += quantity;
    } else if (type === 'Salida') {
      inventory.quantityAvailable -= quantity;
    } else if (type === 'Ajuste') {
      inventory.quantityAvailable = quantity;
    }

    await this.inventoryRepository.save(inventory);

    // Registrar el movimiento
    const movement = this.movementRepository.create({
      type,
      quantity,
      description,
      inventory,
    });
    return this.movementRepository.save(movement);
  } */

  async getMovements(inventoryId: number): Promise<InventoryMovement[]> {
    const inventory = await this.inventoryRepository.findOne({
      where: { id: inventoryId },
      relations: ['movements'],
    });
    if (!inventory) {
      throw new NotFoundException(`Inventory with ID ${inventoryId} not found`);
    }
    return inventory.movements;
  }

  async updateInventory(inventory: Inventory): Promise<Inventory> {
    return await this.inventoryRepository.save(inventory);
  }
}
