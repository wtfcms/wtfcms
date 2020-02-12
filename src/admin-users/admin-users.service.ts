import { Injectable, Get } from '@nestjs/common';
import { AdminUser } from '../entities';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';

@Injectable()
export class AdminUsersService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
  ) {}

  async find(): Promise<AdminUser[]> {
    return await this.adminUserRepository.findAll();
  }

  async create(params): Promise<any> {
    const adminUser = this.adminUserRepository.create(params);
    return await this.adminUserRepository.persistAndFlush(adminUser);
  }
}
