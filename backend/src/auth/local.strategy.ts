// import先が'passport-jwt'では無い事に注意！
import { Strategy as BaseLocalStrategy } from 'passport-local';

import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/entities/user.entity';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(BaseLocalStrategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // passport-localは、デフォルトで username と password をパラメーターで受け取る
  async validate(
    name: User['username'],
    pass: User['password'],
  ): Promise<PasswordOmitUser> {
    // 認証して結果を受け取る
    const user = await this.authService.validateUser(name, pass);

    if (!user) {
      throw new UnauthorizedException(); // 認証失敗
    }

    return user;
  }
}
