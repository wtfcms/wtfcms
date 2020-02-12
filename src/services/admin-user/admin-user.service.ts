import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';

import { AdminUser, AdminGroup, AdminResource } from '../../entities';

@Injectable()
export class AdminUserService {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,

    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,

    @InjectRepository(AdminResource)
    private readonly adminResourceRepository: EntityRepository<AdminResource>,
  ) {}

  async findOne(params = {}): Promise<AdminUser> {
    return await this.adminUserRepository.findOne({
      where: params,
    });
  }

  // async findAll(params = {}): Promise<AdminUser[]> {
  //   return await this.adminUserRepository.findAll({
  //     where: params
  //   })
  // }
}
