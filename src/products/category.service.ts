import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from './dto/createCategory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  async create(categoryDto: CategoryDto) {
    try {
      const newCategory = await this.categoryRepository.create(categoryDto);
      return await this.categoryRepository.save(newCategory);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    try {
      const category = await this.categoryRepository.findOne({
        where: { idCategory: id },
      });
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
  }

  /* update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  } */
}
