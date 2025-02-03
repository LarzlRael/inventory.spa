import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateNewUserDto, SignInDto } from './dto/credentials-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { JWtPayload } from './interfaces/jwt.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async singUp(createNewUserDto: CreateNewUserDto): Promise<User> {
    const { username, password } = createNewUserDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
    });
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      /* TODO remove this */
      console.log(error.code);
      throw new UnauthorizedException();
      /* if (error.code === '23505') {
        // duplicate user
        throw new ConflictException('Username or email already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException();
      } */
    }
  }

  async signIn(signInDto: SignInDto): Promise<User | any> {
    try {
      const { username, password } = signInDto;
      const user = await this.usersRepository.findOne({ where: { username } });
      /*  */
      if (user && (await bcrypt.compare(password, user.password))) {
        return await this.getUserToReturn(user);
      }
      throw new UnauthorizedException('Please check your login credential');
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Please check your login credential');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  /* update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  } */

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  private async getUserToReturn(user: User) {
    const accessToken = await this.generateToken(user.username, '24h');

    delete user.password;
    return { ...user, accessToken };
  }
  private async generateToken(username, period: string): Promise<string> {
    const payload: JWtPayload = { username };

    const accessToken = await this.jwtService.sign(payload, {
      expiresIn: period,
    });
    return accessToken;
  }
}
