import { Injectable, Get } from '@nestjs/common';
import { AdminUser } from '../entities';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository, wrap } from 'mikro-orm';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
  ) {}

  async find(): Promise<AdminUser[]> {
    return await this.adminUserRepository.findAll();
  }

  async findOne(params = {}): Promise<AdminUser> {
    return await this.adminUserRepository.findOne(params);
  }

  async create(params): Promise<AdminUser> {
    const adminUser = new AdminUser();
    wrap(adminUser).assign(params);
    await this.adminUserRepository.persistAndFlush(adminUser);
    return adminUser;
  }
}
