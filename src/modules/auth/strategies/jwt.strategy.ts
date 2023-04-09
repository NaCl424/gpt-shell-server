import {Injectable, UnauthorizedException} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt'
import { jwtConstants } from 'src/constant';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: any) {
      const { username, password, uid, iat, exp } = payload;
      const now = Math.floor(new Date().getTime() / 1000);
      if (now > exp) {
        throw new UnauthorizedException('token已过期');
      }
      return payload;
    }
}
