import { IsEmail } from 'class-validator';
import {
  Entity,
  Property,
  ManyToOne,
  OneToMany,
  Collection,
  ManyToMany,
} from '@mikro-orm/core';

import { BaseEntity, AdminUser } from './';
import { AdminResource } from './AdminResource';

@Entity()
export class AdminGroup extends BaseEntity {
  // 组名称
  @Property({ unique: true })
  name: string;

  // 组状态
  @Property()
  enable: boolean = true;

  @ManyToMany(() => AdminResource)
  power?: Collection<AdminResource> = new Collection<AdminResource>(this);

  // 备注
  @Property()
  comments: string = '';

  @OneToMany(() => AdminUser, (adminUser) => adminUser.group)
  adminUser = new Collection<AdminUser>(this);
}
