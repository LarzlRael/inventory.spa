import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService, ClientService } from './services/';
import { UsersController, ClientsController } from './controllers/';
import { Client } from './entities/client.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, User])],
  controllers: [UsersController, ClientsController],
  providers: [UserService, ClientService],
  exports: [ClientService],
})
export class UsersModule {}
