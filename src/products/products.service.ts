import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
/* import { UpdateProductDto } from './dto/update-product.dto'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Product, Category } from '../entities';
import { SupplierService } from '../supplier/suppliers.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private supplierService: SupplierService,
  ) {}
  async createNewProduct(user: User, createProductDto: CreateProductDto) {
    console.log(createProductDto);
    const category = await this.categoryRepository.findOne({
      where: { idCategory: createProductDto.idCategory },
    });

    try {
      const getOneSupplier = await this.supplierService.getOneSupplierById(
        createProductDto.idSupplier,
      );
      const createNewProduct = this.productRepository.create({
        ...createProductDto,
        category: category,
        supplier: getOneSupplier,
        addedBy: user,
      });
      return await this.productRepository.save(createNewProduct);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });

      if (product !== null) {
        return product;
      }
      new NotFoundException();
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }

  async updateProduct(
    user: User,
    id: number,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const getProduct = await this.findOne(id);
      if (getProduct) {
        await this.productRepository.save({
          ...getProduct,
          ...updateProductDto,
          addedBy: user,
        });
      } else {
        new NotFoundException();
      }
    } catch (error) {
      new InternalServerErrorException(error);
    }
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async productsStock(id: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: id },
      });
      if (!product) throw new NotFoundException('Product not found');
      return {
        productName: product.name,
        stock: product.stockQuantity,
      };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
