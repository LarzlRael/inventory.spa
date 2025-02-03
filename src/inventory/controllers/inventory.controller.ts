import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InventoryService } from '../services/inventory.service';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  /*  @UseGuards(AuthGuard('jwt'))
  @Get('find-sell-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findSellBydId(+id);
  } */
}
