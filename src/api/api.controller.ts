import { Controller, Post, Body, HttpException, ForbiddenException } from '@nestjs/common';
import { AdminUserService, AdminGroupService } from '../services';

@Controller('api')
export class ApiController {
  constructor(
    private readonly adminUserService: AdminUserService,
    private readonly adminGroupService: AdminGroupService,
  ) {}

  @Post('token')
  async doLogin(@Body() body) {
    const { username, password } = body;

    const adminUser = await this.adminUserService.findOne({
      username,
      password
    })

    if (!adminUser) {
      throw new ForbiddenException('用户不可用');
    }

    if (!adminUser.enable) {
      throw new ForbiddenException('用户不可用');
    }

    const adminGroup = await this.adminGroupService.findOne({
      _id: adminUser.group
    })

    if (!adminGroup) {
      throw new ForbiddenException('用户不可用');
    }

    if (!adminGroup.enable) {
      throw new ForbiddenException('用户不可用');
    }
  }
}
