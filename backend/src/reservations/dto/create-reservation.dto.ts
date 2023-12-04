import { IsBoolean, IsDate } from 'class-validator';

export class CreateReservationDto {
  @IsDate()
  readonly meal_date: Date;

  @IsBoolean()
  readonly breakfast: boolean;

  @IsBoolean()
  readonly dinner: boolean;
}
