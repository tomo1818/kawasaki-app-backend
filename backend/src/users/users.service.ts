import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User | undefined> {
    const {
      username,
      email,
      password,
      room_number,
      profile_picture,
      authority,
    } = createUserDto;

    // TODO: パスワードのハッシュ化
    const user = this.usersRepository.create({
      username,
      email,
      password,
      room_number,
      profile_picture,
      authority,
    });
    await this.usersRepository.save(user);
    return user;
  }

  async findAll(): Promise<User[] | undefined> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { user_id: id } });
  }

  async findOneByUsername(username: string) {
    return await this.usersRepository.findOne({
      where: { username: username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { user_id: id } });
  }

  async remove(id: number) {
    return this.usersRepository.delete(id);
  }
}
