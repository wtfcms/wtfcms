import { Controller, Get, Render } from '@nestjs/common';

@Controller('admin')
export class AdminController {
  @Get('login')
  @Render('manage/login.html')
  index() {
    return {};
  }
}
