import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AccessRefreshToken } from '../types/AccessRefreshToken';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BlackList } from './entities/blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthentificationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(BlackList)
    private readonly blackListRepository: Repository<BlackList>,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<AccessRefreshToken | null> {
    const userFounded: User | null =
      await this.userService.findOnByEmail(email);

    if (userFounded == null) throw new BadRequestException('Email Invalid');

    if ((await bcrypt.compare(pass, userFounded.password)) === false)
      throw new UnauthorizedException('Password Invalid');

    return this.login('' + userFounded.id, userFounded.email);
  }

  login(userId: string, userEmail: string): AccessRefreshToken {
    const playload = { id: userId, email: userEmail };

    return {
      access_token: this.jwtService.sign(playload, { expiresIn: '15m' }),
    };
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    return {
      message: 'User Created ',
      status: 201,
      user: user,
    };
  }

  async logout(token: string) {
    const tokenDecoded = this.jwtService.decode(token);

    if (tokenDecoded?.exp === null)
      throw new UnauthorizedException('Token invalid');

    const expiredAt = new Date(tokenDecoded.exp * 1000);

    if ((await this.isInBlackList(token)) !== true) {
      this.blackListRepository.save({ token, expiredAt });
    }
  }

  async isInBlackList(token: string): Promise<boolean> {
    return (await this.blackListRepository.findOne({ where: { token } })) ==
      null
      ? false
      : true;
  }
}
