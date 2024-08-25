import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSellDto } from './dto/create-sell.dto';

import { Sell } from './entities/sell.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product, User, SellDetail } from '../entities';

@Injectable()
export class SellsService {
  constructor(
    @InjectRepository(Sell)
    private sellRepository: Repository<Sell>,
    @InjectRepository(SellDetail)
    private sellDetail: Repository<SellDetail>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}
  async create(user: User, createSellDto: CreateSellDto) {
    const { clientName, products } = createSellDto;

    // Inicializa la venta
    const sell = this.sellRepository.create({
      clientName,
    });

    let totalSell = 0;
    const sellDetails = []; // Array para almacenar los detalles de la venta

    for (const prod of products) {
      const product = await this.productRepository.findOne({
        where: { id: prod.idProduct },
      });
      console.log(product);

      if (!product) {
        throw new NotFoundException(
          `Product with ID ${prod.idProduct} not found`,
        );
      }

      if (product.stockQuantity < prod.quantity) {
        throw new BadRequestException(
          `Not enough stock for product ${product.name}`,
        );
      }

      product.stockQuantity -= prod.quantity;
      await this.productRepository.save(product); // Guardar el producto actualizado

      // Calculate the subtotal
      const subtotal = product.SalePrice * prod.quantity;
      totalSell += subtotal;
      console.log(totalSell);

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
    }

    // Guardar la venta y obtener el ID generado
    const newSell = await this.sellRepository.save({
      ...sell,
      totalVenta: totalSell,
      user: user,
    });
    console.log(newSell);

    // Actualizar los detalles de la venta con la referencia a la venta
    /* TODO USE PROMISE.ALL */
    for (const detail of sellDetails) {
      detail.sell = newSell; // Asignar la venta a cada detalle
      await this.sellDetail.save(detail); // Guardar el detalle de la venta
    }

    return newSell;
  }

  findAll() {
    return `This action returns all sells`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sell`;
  }

  /*  update(id: number, updateSellDto: UpdateSellDto) {
    return `This action updates a #${id} sell`;
  } */

  remove(id: number) {
    return `This action removes a #${id} sell`;
  }
}
