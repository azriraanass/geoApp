import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { AuthentificationService } from '../authentification.service';
import { PassportStrategy } from '@nestjs/passport';
import { AccessRefreshToken } from '../../types/AccessRefreshToken';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthentificationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<AccessRefreshToken> {
    const user: AccessRefreshToken | null = await this.authService.validateUser(
      email,
      password,
    );

    if (user === null) throw new UnauthorizedException('Invalide Creditials');

    return user;
  }
}
