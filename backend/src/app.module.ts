import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, ReservationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
