import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Rental } from '../entities/rental.entity';
import { User } from '../../users/entities/user.entity';
import { RentalItemsDto } from '../dto/update-rental.dto';
import { ProductsService } from '../../products/products.service';
import { ClientService } from '../../users/services/clients.service';

@Injectable()
export class RentalService {
  constructor(
    @InjectRepository(Rental)
    private rentalRepository: Repository<Rental>,

    private productService: ProductsService,
    private clientService: ClientService,
  ) {}

  async newRental(user: User, rentalItemsDto: RentalItemsDto) {
    const { products, idClient } = rentalItemsDto;
    const getProductsAndVerifyExists = await Promise.all(
      products.map(async (prod) =>
        this.productService.findProductByIdAndVerifyStock(
          prod.idProduct,
          prod.quantity,
        ),
      ),
    );
    const getClient = await this.clientService.findOneClient(idClient);
    return { getProductsAndVerifyExists, getClient };
  }
}
