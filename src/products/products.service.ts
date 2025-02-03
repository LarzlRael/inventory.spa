import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
/* import { UpdateProductDto } from './dto/update-product.dto'; */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SupplierService } from '../supplier/suppliers.service';
import { InventoryService } from '../inventory/services/inventory.service';
import { InventoryMovementService } from '../inventory/services/inventory-movement.service';
import { Product } from './entities/product.entity';
import { Category } from './entities/category.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,

    private supplierService: SupplierService,
    private inventoryService: InventoryService,
    private inventoryMovementService: InventoryMovementService,
  ) {}
  async createNewProduct(user: User, createProductDto: CreateProductDto) {
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
      const newProductCreated =
        await this.productRepository.save(createNewProduct);

      /* const inventory = this.inventoryRepository.create({
        quantityAvailable: createProductDto.quantityAvailable,
        quantityReserved: 0, // Inicialmente no hay reservas
        product: savedProduct,
      }); */
      const saveInventory = await this.inventoryService.saveInventory(
        newProductCreated,
        createProductDto.stockQuantity,
      );
      /* Save the inventory */
      await this.productRepository.save({
        ...newProductCreated,
        inventory: saveInventory,
      });

      await this.inventoryMovementService.createMovement(
        saveInventory,
        user,
        'Initial stock',
        'Initial stock creation',
      );

      return newProductCreated;
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
    /* try {
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
    } */
  }

  async findProductById(idProduct: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id: idProduct },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${idProduct} not found`);
    }
    return product;
  }

  async findProductByIdAndVerifyStock(idProduct: number, quantity: number) {
    try {
      const product = await this.productRepository.findOne({
        where: { id: idProduct },
        relations: ['inventory'],
      });
      console.log(product);
      if (!product) {
        throw new NotFoundException(`Product with ID ${idProduct} not found`);
      }
      const inventory = product.inventory;
      if (inventory.quantityAvailable < quantity) {
        throw new InternalServerErrorException(
          `Product with ID ${idProduct} has not enough stock`,
        );
      }
      return product;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error);
    }
  }

  async saveProduct(product: Product): Promise<Product> {
    return await this.productRepository.save(product);
  }
}
