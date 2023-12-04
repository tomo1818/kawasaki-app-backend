import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

type PasswordOmitUser = Omit<User, 'password'>;

interface JWTPayload {
  userId: User['user_id'];
  username: User['username'];
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  // ユーザーの認証
  async validateUser(
    name: User['username'],
    password: User['password'],
  ): Promise<PasswordOmitUser | null> {
    const user = await this.usersService.findOneByUsername(name);

    // パスワードをハッシュ化して保存していればパスワードを判定
    // まだそのままパスワードを保存しているので特に操作しない
    if (user && password == user.password) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

  // jwtトークンを返す
  async login(user: PasswordOmitUser) {
    // jwtにつけるpayload情報
    const payload: JWTPayload = {
      userId: user.user_id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
