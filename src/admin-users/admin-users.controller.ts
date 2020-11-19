import {
  Controller,
  Get,
  UseGuards,
  Post,
  Body,
  BadRequestException,
  Param,
  Put,
} from '@nestjs/common';
import { AdminUsersService } from './admin-users.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminUser } from 'src/entities';
import { CreateAdminUserDto } from './dto';
import {
  EntityRepository,
  UnderscoreNamingStrategy,
  wrap,
} from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';

@Controller('admin-users')
export class AdminUsersController {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
    private readonly adminUsersService: AdminUsersService,
  ) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  find() {
    // return await this.adminUsers.find();
    return 'admin-users';
  }

  @Post()
  async create(@Body() body): Promise<AdminUser> {
    // userName, name, email, phoneNum, countryCode, password, confirm, group, enable, comments
    /**
     * 1、使用username查询adminUser表是否已存在同名账号
     * 不存在则创建新的，存在则抛出错误
     */
    const { username } = body;
    const adminUser = await this.adminUserRepository.findOne({
      username
    });
    if (adminUser) {
      throw new BadRequestException('该用户已存在');
    }
    return await this.adminUsersService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id, @Body() body) {
    const adminUser = await this.adminUserRepository.findOne(id);
    if (!adminUser) {
      throw new BadRequestException();
    }
    wrap(adminUser).assign(body);
    await this.adminUserRepository.flush();
  }
}
