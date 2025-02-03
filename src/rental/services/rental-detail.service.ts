import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RentalDetail } from '../entities/rental-detail.entity';

@Injectable()
export class RentalDetailService {
  constructor(
    @InjectRepository(RentalDetail)
    private rentalDetailRepository: Repository<RentalDetail>,
  ) {}

  async createMovement() {}
}
