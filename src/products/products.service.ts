import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
/* import { UpdateProductDto } from './dto/update-product.dto'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User, Product, Category } from '../entities';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private Product: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(user: User, createProductDto: CreateProductDto) {
    const category = await this.categoryRepository.findOne({
      where: { idCategory: createProductDto.idCategory },
    });
    console.log(category);
    try {
      const createNewProduct = this.Product.create({
        ...createProductDto,
        category: category,
        addedBy: user,
      });
      return await this.Product.save(createNewProduct);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAll() {
    return await this.Product.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  /*   update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  } */

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
