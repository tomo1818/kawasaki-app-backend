import { IsBoolean, IsDate, IsNumber } from 'class-validator';

export class CreateReservationDto {
  @IsNumber()
  readonly user_id: number;

  @IsDate()
  readonly meal_date: Date;

  @IsBoolean()
  readonly breakfast: boolean;

  @IsBoolean()
  readonly dinner: boolean;
}
