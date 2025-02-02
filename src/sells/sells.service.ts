import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';

import { Sell } from './entities/sell.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product, User, SellDetail } from '../entities';
import { ClientService } from 'src/users/services';
import { InventoryService } from '../inventory/inventory.service';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(Sell)
    private sellRepository: Repository<Sell>,
    @InjectRepository(SellDetail)
    private sellDetail: Repository<SellDetail>,

    private productService: ProductsService,
    private clientService: ClientService,
    private inventoryService: InventoryService,
  ) {}
  async createNewSell(user: User, createSellDto: CreateSellDto) {
    const { clientName, products } = createSellDto;

    // Inicializa la venta
    const sell = this.sellRepository.create({
      clientName,
    });

    const queryRunner =
      this.sellRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    let totalSell = 0;
    const sellDetails = []; // Array para almacenar los detalles de la venta
    const updateProduct = [];
    const createMovement = [];

    try {
      const getProductsAndVerifyExists = await Promise.all(
        products.map(async (prod) =>
          this.productService.findProductByIdAndVerifyStock(
            prod.idProduct,
            prod.quantity,
          ),
        ),
      );
      console.log(getProductsAndVerifyExists)
      products.forEach((prod, index) => {
        const product = getProductsAndVerifyExists[index];
        product.stockQuantity -= prod.quantity;
        updateProduct.push(product);

        // Calculate the subtotal
        const subtotal = product.SalePrice * prod.quantity;
        totalSell += subtotal;

        /* create the movement */

        createMovement.push({
          movementType: 'Venta',
          quantity: prod.quantity,
          reason: 'Venta de producto',
          product,
        });
        // create detail_sell
        const sellDetail = this.sellDetail.create({
          product: product,
          sell: null, // Se asignará más tarde después de guardar la venta
          quantitySold: prod.quantity,
          priceSale: product.SalePrice,
          subtotal,
        });
        console.log(sellDetail);

        sellDetails.push(sellDetail); // Agregar el detalle de la venta al array
      });

      const getClient = await this.clientService.findOneClient(
        createSellDto.idClient,
      );
      // Guardar la venta y obtener el ID generado
      const newSell = await this.sellRepository.save({
        ...sell,
        totalVenta: totalSell,
        user: user,
        client: getClient,
      });
      console.log(newSell);

      // Actualizar los detalles de la venta con la referencia a la venta
      /* TODO USE PROMISE.ALL */

      Promise.all(
        sellDetails.map((detail) =>
          this.sellDetail.save({ ...detail, sell: newSell }),
        ),
      );
      Promise.all(
        updateProduct.map((product) =>
          this.productService.saveProduct(product),
        ),
      );

      console.log(JSON.stringify(createMovement, null, 2));
      Promise.all(
        createMovement.map((movement) =>
          this.inventoryService.createMovement(
            movement,
            movement.product,
            user,
          ),
        ),
      );

      return newSell;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }

  async findSellBydId(id: number) {
    const sell = await this.sellRepository.findOne({
      where: { idSell: id },
      relations: ['client', 'sellDetail'],
    });
    if (!sell) {
      throw new NotFoundException(`Sell with ID ${id} not found`);
    }
    return sell;
  }

  /*  update(id: number, updateSellDto: UpdateSellDto) {
    return `This action updates a #${id} sell`;
  } */

  remove(id: number) {
    return `This action removes a #${id} sell`;
  }
}
