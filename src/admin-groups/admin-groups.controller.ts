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
  UseGuards,
} from '@nestjs/common';
import { AdminGroupsService } from './admin-groups.service';
import { CreateAdminGroupDto, updateAdminGroupDto } from './dto/create.dto';
import { IdDto } from 'src/shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('管理组')
@Controller('admin-groups')
export class AdminGroupsController {
  constructor(private readonly adminGroupsService: AdminGroupsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.adminGroupsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body: CreateAdminGroupDto) {
    return await this.adminGroupsService.create(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param() params: IdDto) {
    return await this.adminGroupsService.delete(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param() params: IdDto) {
    return await this.adminGroupsService.findOne(params);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param() params: IdDto, @Body() body: updateAdminGroupDto) {
    return await this.adminGroupsService.update(body);
  }
}
