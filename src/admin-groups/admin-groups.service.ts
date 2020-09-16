import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { AdminGroup, AdminResource } from '../entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';

@Injectable()
export class AdminGroupsService {
  constructor(
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
    @InjectRepository(AdminResource)
    private readonly adminResourceRepository: EntityRepository<AdminResource>,
  ) {}

  async findAll(): Promise<AdminGroup[]> {
    return await this.adminGroupRepository.findAll();
  }

  async create(params): Promise<AdminGroup> {
    let adminGroup = await this.adminGroupRepository.findOne({
      name: params.name,
    });

    if (adminGroup) {
      throw new BadRequestException('该用户组已存在');
    }
    adminGroup = new AdminGroup();
    wrap(adminGroup).assign(params);
    await this.adminGroupRepository.persistAndFlush(adminGroup);
    return adminGroup;
  }

  async delete(id): Promise<any> {
    const adminGroup = await this.adminGroupRepository.findOne(id, [
      'adminUser',
    ]);
    if (!adminGroup) {
      throw new BadRequestException('没有找到用户组');
    }

    if (adminGroup.adminUser.length) {
      throw new BadRequestException('该用户组下有用户');
    }

    await this.adminGroupRepository.removeAndFlush(adminGroup);
    return {
      success: true,
    };
  }

  async findOne(params): Promise<AdminGroup> {
    return await this.adminGroupRepository.findOne(params);
  }

  async update(id, params): Promise<AdminGroup> {
    const adminGroup = await this.adminGroupRepository.findOne(id);
    if (!adminGroup) {
      throw new BadRequestException();
    }
    wrap(adminGroup).assign(params);
    await this.adminGroupRepository.flush();
    return adminGroup;
  }
}
