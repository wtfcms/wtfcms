import { Injectable } from '@nestjs/common';
import { AdminGroup } from '../../entities';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';

@Injectable()
export class AdminGroupService {
  constructor(
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
  ) {}

  async findOne(params = {}):Promise<AdminGroup> {
    return await this.adminGroupRepository.findOne({
      where: params
    })
  }
}
