import { Injectable, Body, BadRequestException } from '@nestjs/common';
import { AdminGroup } from '../entities';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository, wrap } from 'mikro-orm';

@Injectable()
export class AdminGroupsService {
  constructor(
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
  ) {}

  async findAll(): Promise<AdminGroup[]> {
    return await this.adminGroupRepository.findAll();
  }

  async create(params): Promise<AdminGroup> {
    const adminGroup = new AdminGroup();
    wrap(adminGroup).assign(params);
    await this.adminGroupRepository.persistAndFlush(adminGroup);
    return adminGroup;
  }

  async delete(params): Promise<any> {
    const result = await this.adminGroupRepository.remove(params);
    if (!result) {
      throw new BadRequestException('未找到ID');
    }

    return result;
  }

  async findOne(params): Promise<AdminGroup> {
    return await this.adminGroupRepository.findOne(params);
  }

  async update(params): Promise<AdminGroup> {
    const adminGroup = await this.adminGroupRepository.findOne(params);
    wrap(adminGroup).assign(params);
    await this.adminGroupRepository.flush();
    return adminGroup;
  }
}
