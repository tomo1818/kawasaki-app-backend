import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Timestamp,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @Column({ type: 'date', nullable: false })
  meal_date: Date;

  @Column({ nullable: false })
  breakfast: boolean;

  @Column({ nullable: false })
  dinner: boolean;

  @CreateDateColumn({ comment: '登録日時' })
  readonly created_at?: Timestamp;

  @UpdateDateColumn({ comment: '最終更新日時' })
  readonly updated_at?: Timestamp;
}
