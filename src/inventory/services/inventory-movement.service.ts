import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryDto } from '../dto/inventory.dto';
import { User } from '../../users/entities/user.entity';
import { InventoryMovement } from '../entities/inventory-movements.entity';
import { Inventory } from '../entities/inventory.entity';

@Injectable()
export class InventoryMovementService {
  constructor(
    @InjectRepository(InventoryMovement)
    private movementRepository: Repository<InventoryMovement>,
  ) {}

  async createMovement(
    inventory: Inventory,
    user: User,
    movementType: string,
    description: string,
  ) {
    try {
      const movement = this.movementRepository.create({
        inventory: {
          id: inventory.id,
        },
        movementType: movementType,
        user: { id: user.id },
        reason: description,
      });
      return await this.movementRepository.save(movement);
    } catch (error) {
      console.log(error);
    }
  }
}
