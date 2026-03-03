import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlackList } from './entities/blacklist.entity';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'ANASS',
      signOptions: {
        expiresIn: '15m',
      },
    }),
    PassportModule,
    TypeOrmModule.forFeature([BlackList]),
  ],
  controllers: [AuthentificationController],
  providers: [AuthentificationService, LocalStrategy, JwtStrategy],
})
export class AuthentificationModule {}
