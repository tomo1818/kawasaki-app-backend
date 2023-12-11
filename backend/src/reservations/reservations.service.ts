import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository, Between } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private reservationsRepository: Repository<Reservation>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createReservationDto: CreateReservationDto) {
    const { user_id, meal_date, breakfast, dinner } = createReservationDto;

    const user = await this.usersRepository.findOne({
      where: { user_id: user_id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    const reservation = this.reservationsRepository.create({
      user,
      meal_date,
      breakfast,
      dinner,
    });

    await this.reservationsRepository.save(reservation);
    return reservation;
  }

  async findAll() {
    return await this.reservationsRepository.find({
      relations: ['user'], // 関連するユーザーデータを取得するために追加
    });
  }

  async findOne(id: number) {
    return await this.reservationsRepository.findOne({
      where: { reservation_id: id },
      relations: ['user'],
    });
  }

  async findAllByDate(mealDate: Date): Promise<Reservation[]> {
    return this.reservationsRepository.find({
      where: { meal_date: mealDate },
      relations: ['user'],
    });
  }

  async findAllByMonthAndUser(
    userId: number,
    year: number,
    month: number,
  ): Promise<Reservation[]> {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0, 23, 59, 59, 999); // 最終日の23:59:59.999

    const reservations = await this.reservationsRepository.find({
      where: {
        user: { user_id: userId },
        meal_date: Between(startDate, endDate),
      },
    });

    if (!reservations.length) {
      throw new NotFoundException('Reservations not found');
    }

    return reservations;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto) {
    await this.reservationsRepository.update(id, updateReservationDto);
    return this.reservationsRepository.findOne({
      where: { reservation_id: id },
    });
  }

  async remove(id: number) {
    return this.reservationsRepository.delete(id);
  }
}
