import { Controller, Post, Body } from '@nestjs/common';
import { AdminUserService } from 'src/services';
import { isEmpty } from 'lodash';

@Controller('api')
export class ApiController {
  constructor(private readonly adminUserService: AdminUserService) {}

  @Post('admin/doLogin')
  async doLogin(@Body() body) {
    console.log(
      isEmpty({
        name: 1,
      }),
    );
    console.log(body);
    const { username, password } = body;

    const user = await this.adminUserService.findOne({
      username,
      password,
    });

    if (user) {
    }
    // console.log(result)
    // return result;

    // if (!user.enable) {

    // }
  }
}
