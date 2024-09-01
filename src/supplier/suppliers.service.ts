import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from '../orders/entities';
import { NewSupplierDto } from './dto/create-supllier.dto';
@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Supplier)
    private suppliersRepository: Repository<Supplier>,
  ) {}

  async create(supplier: NewSupplierDto) {
    try {
      const createSupplier = this.suppliersRepository.create(supplier);
      return await this.suppliersRepository.save(createSupplier);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllSuppliers() {
    try {
      return await this.suppliersRepository.find();
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  async getOneSupplierById(id: number | null): Promise<Supplier> {
    try {
      if (!id) return null;
      const getOneSupplier = await this.suppliersRepository.findOne({
        where: { id: id },
      });

      return getOneSupplier ?? getOneSupplier;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
