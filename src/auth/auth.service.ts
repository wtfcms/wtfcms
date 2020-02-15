import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service'
import { AdminUsersService } from '../admin-users/admin-users.service';
import { AdminGroupsService } from '../admin-groups/admin-groups.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly adminUserService: AdminUsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
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
