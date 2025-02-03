import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { ZodValidationPipe } from '../../pipes/zod.validation.pipe';
import { GetUser } from '../../pipes/get.user.decorator';
import { AuthGuard } from '@nestjs/passport';

import { OrdersService } from '../services/orders.service';
import { User } from '../../users/entities/user.entity';
import {
  createNewOrderProductSchema,
  createOrderSchema,
} from '../dto/create-new-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(createOrderSchema)) createOrderDto,
  ) {
    return this.ordersService.createNewOrder(user, createOrderDto);
  }
}
