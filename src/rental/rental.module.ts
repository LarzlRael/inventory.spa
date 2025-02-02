import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RentalController } from './rental.controller';
import { RentalService } from './rental.service';
import { Rental } from './entities/rental.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental])],
  controllers: [RentalController],
  providers: [RentalService],
})
export class RentalModule {}
