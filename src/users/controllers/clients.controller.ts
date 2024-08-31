import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { AuthGuard } from '@nestjs/passport';
import { ClientService } from '../services';
import {
  createNewClientSchema,
  CreateNewUserDto,
} from '../dto/create-client.dto';
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(
    @Body(new ZodValidationPipe(createNewClientSchema)) createNewClientDto,
  ) {
    return this.clientsService.createNewClient(createNewClientDto);
  }
  @Get()
  findAll() {
    return this.clientsService.findAllClients();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/client-sells/:id')
  clientSells(@Param('id') id: string) {
    return this.clientsService.getClientSells(parseInt(id));
  }
  /* 


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  } */
}
