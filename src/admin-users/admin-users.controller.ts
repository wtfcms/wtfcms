import { Controller, Get } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service'

@Controller('admin-users')
export class AdminUsersController {
  constructor(
    private readonly adminUsersService: AdminUsersService
  ) { }

  @Get()
  find() {
    // return await this.adminUsers.find();
    return 'admin-users'
  }
}
