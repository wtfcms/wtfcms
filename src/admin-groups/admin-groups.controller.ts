import {
  Controller,
  Get,
  Post,
  Body,
  ForbiddenException,
  BadRequestException,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { AdminGroupsService } from './admin-groups.service';
import {
  CreateAdminGroupDto, updateAdminGroupDto,
} from './dto/create.dto';
import { IdDto } from 'src/shared/dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('管理组')
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
  async delete(@Param() params: IdDto) {
    return await this.adminGroupsService.delete(params);
  }

  @Get(':id')
  async findOne(@Param() params: IdDto) {
    return await this.adminGroupsService.findOne(params);
  }

  @Patch(':id')
  async update(@Param() params: IdDto, @Body() body: updateAdminGroupDto) {
    return await this.adminGroupsService.update(body)
  }
}
