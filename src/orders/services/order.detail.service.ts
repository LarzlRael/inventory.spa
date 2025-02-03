import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetailOrder, Order } from '../entities/';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrdersDetailService {
  constructor(
    @InjectRepository(DetailOrder)
    private sellRepository: Repository<DetailOrder>,
  ) {}
  async createNewDetailOrder(idOrder: Order, idProduct: Product) {
    try {
      const newDetailOrder = this.sellRepository.create({
        order: idOrder,
        product: idProduct,
        quantity: 1,
      });
      return await this.sellRepository.save(newDetailOrder);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
