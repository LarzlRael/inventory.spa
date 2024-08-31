import { Injectable } from '@nestjs/common';
import { CreateNewUserDto } from '../dto/create-client.dto';

@Injectable()
export class UserService {
  createNewClient(createNewUserDto: CreateNewUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  /*  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  } */

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}