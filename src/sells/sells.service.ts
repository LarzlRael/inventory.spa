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

import { InventoryService } from '../inventory/services/inventory.service';
import { ProductsService } from '../products/products.service';
import { ClientService } from '../users/services/clients.service';
import { InventoryMovementService } from '../inventory/services/inventory-movement.service';
import { SellDetail } from './entities/sell.detail.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(Sell)
    private sellRepository: Repository<Sell>,
    @InjectRepository(SellDetail)
    private sellDetailRepository: Repository<SellDetail>,

    private productService: ProductsService,
    private clientService: ClientService,
    private inventoryService: InventoryService,
    private inventoryMovementService: InventoryMovementService,
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
    const updateInventory = [];

    try {
      const getProductsAndVerifyExists = await Promise.all(
        products.map(async (prod) =>
          this.productService.findProductByIdAndVerifyStock(
            prod.idProduct,
            prod.quantity,
          ),
        ),
      );

      products.forEach((prod, index) => {
        const product = getProductsAndVerifyExists[index];
        const productInventory = product.inventory;

        productInventory.quantityAvailable -= prod.quantity;
        updateInventory.push(productInventory);
        updateProduct.push(product);

        // Calculate the subtotal
        const subtotal = product.SalePrice * prod.quantity;
        totalSell += subtotal;

        /* create the movement */

        createMovement.push({
          movementType: 'Venta',
          quantity: prod.quantity,
          reason: 'Venta de producto',
          inventory: productInventory,
        });
        // create detail_sell
        const sellDetail = this.sellDetailRepository.create({
          product: product,
          sell: null, // Se asignará más tarde después de guardar la venta
          quantitySold: prod.quantity,
          priceSale: product.SalePrice,
          subtotal,
        });

        sellDetails.push(sellDetail); // Agregar el detalle de la venta al array
      });

      const getClient = await this.clientService.findOneClient(
        createSellDto.idClient,
      );
      // Guardar la venta y obtener el ID generado
      const newSell = await this.sellRepository.save({
        ...sell,
        totalSale: totalSell,
        user: user,
        client: getClient,
      });

      // Actualizar los detalles de la venta con la referencia a la venta
      /* TODO USE PROMISE.ALL */

      Promise.all(
        sellDetails.map((detail) =>
          this.sellDetailRepository.save({ ...detail, sell: newSell }),
        ),
      );
      Promise.all(
        updateProduct.map((product) =>
          this.productService.saveProduct(product),
        ),
      );
      Promise.all(
        updateInventory.map((product) =>
          this.inventoryService.updateInventory(product),
        ),
      );

      Promise.all(
        createMovement.map((movement) =>
          this.inventoryMovementService.createMovement(
            movement.inventory,
            user,
            movement.movementType,
            movement.reason,
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
