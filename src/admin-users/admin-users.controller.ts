import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find() {
    // return await this.adminUsers.find();
    return 'admin-users';
  }
}
