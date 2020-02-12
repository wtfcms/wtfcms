import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  BadRequestException,
  Delete,
  Param,
} from '@nestjs/common';
import { AdminGroupsService } from './admin-groups.service';
import {
  CreateAdminGroupDto,
  DeleteAdminGroupDto,
  FindOneAdminGroupDto,
} from './dto/create.dto';

@Controller('admin-groups')
export class AdminGroupsController {
  constructor(private readonly adminGroupsService: AdminGroupsService) {}

  @Get()
  async findAll() {
    return await this.adminGroupsService.findAll();
  }

  @Post()
  async create(@Body() body: CreateAdminGroupDto) {
    return await this.adminGroupsService.create(body);
  }

  @Delete(':id')
  async delete(@Param() params: DeleteAdminGroupDto) {
    return await this.adminGroupsService.delete(params);
  }

  @Get(':id')
  async findOne(@Param() params: FindOneAdminGroupDto) {
    return await this.adminGroupsService.findOne(params);
  }
}
