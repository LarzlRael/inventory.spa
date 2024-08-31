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
import { OrdersService } from '../services/orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  /* @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(createSellSchema)) createSellDto: CreateSellDto,
  ) {
    return this.sellsService.create(user, createSellDto);
  } */

  
}
