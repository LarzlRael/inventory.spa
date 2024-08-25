import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { createProductSchema } from './dto/create-product.dto';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../pipes/get.user.decorator';
import { User } from '../entities';
import { ZodPipe } from 'src/pipes/zod.pipe';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  /* @UsePipes(new ZodValidationPipe(createProductSchema)) */
  @Post()
  create(
    @GetUser() user: User,
    /* @Body() createProductDto: CreateProductDto, */
    @Body(new ZodPipe(createProductSchema)) createProductDto,
  ) {
    return this.productsService.create(user, createProductDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/findall')
  findAll(@GetUser() user: User) {
    console.log(user);
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
