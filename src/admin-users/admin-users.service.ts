import { Injectable, Get } from '@nestjs/common';
import { AdminGroup, AdminUser } from '../entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
  ) {}

  async find(): Promise<AdminUser[]> {
    return await this.adminUserRepository.findAll();
  }

  async findOne(params = {}): Promise<AdminUser> {
    return await this.adminUserRepository.findOne(params);
  }

  async create(params): Promise<AdminUser> {
    const adminGroup = await this.adminGroupRepository.findOne({
      id: params.group,
    });
    const adminUser = new AdminUser();
    adminUser.group = adminGroup;
    await this.adminUserRepository.persistAndFlush(adminUser);
    return adminUser;
  }
}
