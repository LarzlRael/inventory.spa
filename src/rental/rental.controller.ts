import { RentalService } from './rental.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  /*  @UseGuards(AuthGuard('jwt'))
  @Get('find-sell-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findSellBydId(+id);
  } */
}
