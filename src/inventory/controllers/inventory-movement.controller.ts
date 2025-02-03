import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

import { InventoryMovementService } from '../services/inventory-movement.service';

@Controller('inventory-movement')
export class InventoryMovementController {
  constructor(private readonly inventoryService: InventoryMovementService) {}

  /*  @UseGuards(AuthGuard('jwt'))
  @Get('find-sell-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findSellBydId(+id);
  } */
}
