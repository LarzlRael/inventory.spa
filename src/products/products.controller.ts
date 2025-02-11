import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  createProductSchema,
  updateProductSchema,
} from './dto/create-product.dto';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../pipes/get.user.decorator';

import { ZodPipe } from '../pipes/zod.pipe';
import { User } from '../users/entities/user.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../files-upload/utils/upload.utils';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    /* @Body() createProductDto: CreateProductDto, */
    @Body(new ZodPipe(createProductSchema)) createProductDto,
  ) {
    return this.productsService.createNewProduct(user, createProductDto);
  }

  @Get()
  findAll(@GetUser() user: User) {
    console.log(user);
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: number,
    @Body(new ZodPipe(updateProductSchema)) updateProductDto,
  ) {
    return this.productsService.updateProduct(user, id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('/stock-product/:id')
  getStockProduct(@Param('id') id: string) {
    return this.productsService.productsStock(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FileInterceptor('productImage', {
      fileFilter: fileFilter,
    }),
  )
  @Put('update-image/:idProduct')
  createCourse(
    @GetUser() user: User,
    @UploadedFile() imageCourse: Express.Multer.File,
    @Param('idProduct') id: string,
  ) {
    return this.productsService.updateImageFileCourseInformation(
      +id,
      user,
      imageCourse,
    );
  }
}
