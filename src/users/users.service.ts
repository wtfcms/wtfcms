import { Injectable } from '@nestjs/common';
import { InjectRepository } from 'nestjs-mikro-orm';
import { EntityRepository } from 'mikro-orm';
import { User } from '../entities';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) { }

  async findOne(params = {}): Promise<User> {
    return this.userRepository.findOne(params);
  }
}