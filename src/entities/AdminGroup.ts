import { IsEmail } from 'class-validator';
import { Entity, Property, ManyToOne } from 'mikro-orm';

import { BaseEntity, AdminUser } from './';

@Entity()
export class AdminGroup extends BaseEntity {
  // 组名称
  @Property()
  name: string;

  // 组状态
  @Property()
  enable: boolean = true;

  // 备注
  @Property()
  comments: string;
}
