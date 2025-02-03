import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async createNewClient(createUserDto: CreateUserDto) {
    try {
      const createUser = this.clientRepository.create(createUserDto);
      return await this.clientRepository.save(createUser);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneClient(id: number) {
    try {
      const client = await this.clientRepository.findOneBy({ id });
      if (!client) {
        throw new InternalServerErrorException('Client not found');
      }
      return client;
    } catch (error) {
      throw new InternalServerErrorException('Client not found');
    }
  }

  async getClientSells(idClient: number) {
    try {
      const findClient = await this.clientRepository.findOne({
        where: { id: idClient },
        relations: ['sells'],
      });
      if (!findClient)
        throw new InternalServerErrorException('Client not found');
      return findClient;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findAllClients() {
    return await this.clientRepository.find();
  }
}
