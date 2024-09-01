import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreateSellDto, createSellSchema } from '../orders/dto/create-sell.dto';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';
import { GetUser } from '../pipes/get.user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities';

import { SupplierService } from './suppliers.service';
import { NewSupplierDto, newSupplierSchema } from './dto/create-supllier.dto';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SupplierService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(newSupplierSchema)) createSupplierDto,
  ) {
    return this.supplierService.create(createSupplierDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(
    ) {
    return this.supplierService.findAllSuppliers();
  }
}
