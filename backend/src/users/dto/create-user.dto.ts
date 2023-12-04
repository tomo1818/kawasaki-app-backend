import { IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly profile_picture: string;

  @IsInt()
  readonly room_number: number;

  @IsInt()
  readonly authority: number;
}
