import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { JwtPayload } from './jwt-payload.interface';

export class jwtCustomStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: 'dhijdjmoels656s',
      });
    }
    
    async validate(payload: JwtPayload) {
        return { userId: payload.sub, username: payload.username };
    }
}