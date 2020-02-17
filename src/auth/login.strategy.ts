import { Strategy } from 'passport-custom';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { LoginDto } from './dto';
import { ValidationOptions } from 'src/shared/config';

@Injectable()
export class LoginStrategy extends PassportStrategy(Strategy, 'login') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  /**
   * see http://www.passportjs.org/packages/passport-custom/
   * or
   * https://github.com/mbell8903/passport-custom
   */
  async validate(req): Promise<any> {
    const obj = plainToClass(LoginDto, req.body);
    const errors = await validate(obj, ValidationOptions);
    if (errors.length) {
      throw new BadRequestException(errors);
    }
    const user = await this.authService.validateUser(obj);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
