import { Controller, Get, Post, Body, ForbiddenException, BadRequestException, Delete, Param } from '@nestjs/common';
import { AdminGroupsService } from './admin-groups.service'

@Controller('admin-groups')
export class AdminGroupsController {
  constructor(
    private readonly adminGroupsService: AdminGroupsService
  ) { }

  @Get()
  async find() {
    return await this.adminGroupsService.findAll();
  }

  @Post()
  async create(@Body() body) {
    if (!body.name) {
      throw new BadRequestException('组名称不能为空')
    }
    return await this.adminGroupsService.create(body);
  }

  @Delete(':id')
  async delete (@Param() params) {
    return await this.adminGroupsService.delete(params);
  }
}
