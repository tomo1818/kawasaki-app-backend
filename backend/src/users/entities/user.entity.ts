import { Reservation } from 'src/reservations/entities/reservation.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  profile_picture: string;

  @Column({ nullable: false })
  room_number: number;

  @Column({ nullable: false })
  authority: number;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly updated_at?: Timestamp;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
