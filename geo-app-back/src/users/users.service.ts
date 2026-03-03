import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    if (
      (await this.findOnByEmail(createUserDto.email)) !== null ||
      (await this.findOneByPhoneNumber(createUserDto.phoneNumber)) !== null
    )
      throw new ConflictException('Email or Phone number already taken');

    const newUser = new User();

    Object.assign(newUser, createUserDto);

    try {
      return this.userRepository.save(newUser);
    } catch (saveException) {
      throw new ConflictException(
        "Error dans la base de donnees lors d'ajoute d'une nouveau user",
      );
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.find({ where: { id: id } });
  }

  async findOnByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email: email });
  }

  async findOneByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return this.userRepository.findOneBy({ phoneNumber: phoneNumber });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User | null = await this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException('User not founded');

    Object.assign(user, updateUserDto);

    try {
      return await this.userRepository.save(user);
    } catch (updateException) {
      if (updateException.code === '23505')
        throw new ConflictException('Email already exists');
      throw updateException;
    }
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }
}
