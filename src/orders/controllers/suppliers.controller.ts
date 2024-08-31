import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { CreateSellDto, createSellSchema } from '../dto/create-sell.dto';
import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { GetUser } from '../../pipes/get.user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../entities';

import { SupplierService } from '../services';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly supplierService: SupplierService) {}

  /* @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(createSellSchema)) createSellDto: CreateSellDto,
  ) {
    return this.sellsService.create(user, createSellDto);
  } */
}
