import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellDto } from '../dto/create-sell.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private sellRepository: Repository<Order>,
  ) {}
}
