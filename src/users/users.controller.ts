import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/entities';

@Controller('users')
export class UsersController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  @Get(':id')
  async findOne() {}

  @Get()
  async findAll() {
    return await this.userRepository.findAll();
  }

  @Post()
  async create(@Body() body) {
    const user = new User();
    wrap(user).assign(body);
    await this.userRepository.persistAndFlush(user);
    return user;
  }
}
