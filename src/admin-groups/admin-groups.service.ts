import { Injectable, Body } from '@nestjs/common';
import { AdminGroup } from '../entities'
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository, wrap } from 'mikro-orm';

@Injectable()
export class AdminGroupsService {
  constructor(
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
  ) {}

  async findAll() {
    return await this.adminGroupRepository.findAll();
  }

  async create(params) {
    const adminGroup = new AdminGroup();
    wrap(adminGroup).assign(params)
    await this.adminGroupRepository.persistAndFlush(adminGroup);
    return adminGroup;
  }

  async delete(params) {
    console.log(params)
    const result = await this.adminGroupRepository.remove(params)
    // const result1= await this.adminGroupRepository.flush();
    // this
    console.log('result', result)
    // console.log('result1', result1)
  }
}
