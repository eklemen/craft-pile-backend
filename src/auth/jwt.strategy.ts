import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { passportJwtSecret } from 'jwks-rsa';
import { UserService } from '../user/user.service';

interface CognitoIdToken {
  sub: string;
  aud: string;
  email_verified: boolean;
  token_use: string;
  auth_time: number;
  iss: string;
  cognito_username: string;
  exp: number;
  given_name: string;
  iat: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      _audience: configService.get('AWS_COGNITO_CLIENT_ID'),
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri:
          configService.get('AWS_COGNITO_AUTHORITY') + '/.well-known/jwks.json',
      }),
    });
  }

  async validate(payload: CognitoIdToken) {
    const user = await this.userService.getUserByEmail(payload.email);
    return {
      idUser: payload.sub,
      email: payload.email,
      accountId: user.account.id,
    };
  }
}
