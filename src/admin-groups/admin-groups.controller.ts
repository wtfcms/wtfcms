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
  Put,
} from '@nestjs/common';
import { AdminGroupsService } from './admin-groups.service';
import { CreateAdminGroupDto, updateAdminGroupDto } from './dto';
import { IdDto } from 'src/shared/dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('管理组')
@Controller('admin-groups')
export class AdminGroupsController {
  constructor(private readonly adminGroupsService: AdminGroupsService) {}

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    return await this.adminGroupsService.findAll();
  }

  // @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() body) {
    return await this.adminGroupsService.create(body);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param() params: IdDto) {
    return await this.adminGroupsService.findOne(params);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id, @Body() body) {
    return await this.adminGroupsService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id) {
    return await this.adminGroupsService.delete(id);
  }
}
