import { Controller, Get, UseGuards, Post, Body } from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminUser } from 'src/entities';
import { CreateAdminUserDto } from './dto';

@Controller('admin-users')
export class AdminUsersController {
  constructor(private readonly adminUsersService: AdminUsersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  find() {
    // return await this.adminUsers.find();
    return 'admin-users';
  }

  @Post()
  async create(@Body() body: CreateAdminUserDto): Promise<AdminUser> {
    return await this.adminUsersService.create(body);
  }
}
