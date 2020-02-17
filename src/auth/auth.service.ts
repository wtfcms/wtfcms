import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AdminUsersService } from '../admin-users/admin-users.service';
import { AdminGroupsService } from '../admin-groups/admin-groups.service';
import { User, AdminUser } from 'src/entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminUserService: AdminUsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser({ username, password, type }): Promise<any> {
    let user: User | AdminUser;
    if (type === 1) {
      user = await this.usersService.findOne({
        username,
        password,
      });
    }

    if (type === 2) {
      user = await this.adminUserService.findOne({
        username,
        password,
      });
    }

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
