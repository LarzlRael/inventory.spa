import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellDto } from '../dto/create-sell.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/';
import { CreatesOrderDto } from '../dto/create-new-order.dto';
import { User } from '../../users/entities/user.entity';
import { ProductsService } from '../../products/products.service';
import { OrdersDetailService } from './order.detail.service';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private productService: ProductsService,
    private ordersDetailService: OrdersDetailService,
  ) {}

  async createNewOrder(user: User, createNewOrderDto: CreatesOrderDto) {
    const { date, products } = createNewOrderDto;
    // Verificar que el usuario existe

    // Crear la orden
    const order = this.orderRepository.create({
      user,
      date: date,
    });
    const savedOrder = await this.orderRepository.save(order);

    // Procesar cada detalle de la orden
    for (const product of products) {
      // Crear o encontrar el producto

      // Si el producto no existe, crearlo

      const productCreated = await this.productService.createNewProduct(user, product);

      // Crear el detalle de la orden

      await this.ordersDetailService.createNewDetailOrder(savedOrder, productCreated);
    }

    return savedOrder;
  }
}
