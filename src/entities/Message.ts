import { Entity, ManyToOne, Property } from '@mikro-orm/core';

import { BaseEntity } from '.';
import { User } from './User';

@Entity()
export class Message extends BaseEntity {
  @ManyToOne(() => User)
  author: User;
}
