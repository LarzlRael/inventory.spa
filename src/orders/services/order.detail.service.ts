import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DetailOrder } from '../entities/';

@Injectable()
export class OrdersDetailService {
  constructor(
    @InjectRepository(DetailOrder)
    private sellRepository: Repository<DetailOrder>,
  ) {}
}
