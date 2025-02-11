import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SellsService } from './sells.service';
import { CreateSellDto, createSellSchema } from './dto/create-sell.dto';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';
import { GetUser } from '../pipes/get.user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../users/entities/user.entity';

@Controller('sells')
export class SellsController {
  constructor(private readonly sellsService: SellsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(createSellSchema)) createSellDto: CreateSellDto,
  ) {
    return this.sellsService.createNewSell(user, createSellDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getLast() {
    return this.sellsService.findAllSells();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('find-sell-by-id/:id')
  findOne(@Param('id') id: string) {
    return this.sellsService.findSellBydId(+id);
  }

  /* @Patch(':id')
  update(@Param('id') id: string, @Body() updateSellDto: UpdateSellDto) {
    return this.sellsService.update(+id, updateSellDto);
  } */

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sellsService.remove(+id);
  }
}
