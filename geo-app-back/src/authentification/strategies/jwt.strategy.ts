import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthentificationService } from '../authentification.service';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthentificationService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'ANASS',
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, playloed: any) {
    const token: string | null =
      ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    if (
      token === null ||
      (await this.authService.isInBlackList(token)) === true
    )
      throw new UnauthorizedException('Token has been revoked');

    return playloed;
  }
}
