import { Product } from 'src/entities';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { InventoryDto } from './dto/inventory.dto';
import { User } from '../users/entities/user.entity';
import { InventoryMovement } from './entities/inventory-movements.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryMovement)
    private inventoryRepository: Repository<InventoryMovement>,
  ) {}

  async createMovement(movement: InventoryDto, product: Product, user: User) {
    const newMovement = this.inventoryRepository.create({
      ...movement,
      user: {
        id: user.id,
      },
      product,
    });
    await this.inventoryRepository.save(newMovement);
    return newMovement;
  }
}
