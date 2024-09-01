import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellDto } from '../dto/create-sell.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/';
import { CreatesOrderDto } from '../../products/dto/create-new-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private sellRepository: Repository<Order>,
  ) {}

  async createNewOrder(createNewOrderDto: CreatesOrderDto) {}
}
