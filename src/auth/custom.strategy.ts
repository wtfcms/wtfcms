import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class CustomStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * see http://www.passportjs.org/packages/passport-custom/
   * or
   * https://github.com/mbell8903/passport-custom
   */
  async validate(req): Promise<any> {
    console.log(req.body)
    // const user = await this.authService.validateUser(username, password);
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
  }
}