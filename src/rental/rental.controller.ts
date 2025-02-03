import { AuthGuard } from '@nestjs/passport';
import { RentalService } from './services/rental.service';
import { GetUser } from '../auth/decorators/get.user.decorator';
import { User } from '../users/entities/user.entity';
import { ZodValidationPipe } from '../pipes/zod.validation.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RentalItemsDto, rentalItemsSchema } from './dto/update-rental.dto';

@Controller('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @GetUser() user: User,
    @Body(new ZodValidationPipe(rentalItemsSchema))
    createSellDto: RentalItemsDto,
  ) {
    return this.rentalService.newRental(user, createSellDto);
  }
}
