import { IsEmail } from 'class-validator';
import { Entity, Property, ManyToOne } from 'mikro-orm';

import { BaseEntity, AdminUser } from './';

@Entity()
export class AdminGroup extends BaseEntity {
  // 用户在名称
  @Property()
  name: string;

  // 权限
  @Property()
  power: [
    {
      type: string;
    },
  ];

  // 日期
  @Property()
  date = Date.now;

  // 备注
  @Property()
  comments: string;

  @ManyToOne()
  adminUser: AdminUser;

  @Property()
  enable: boolean = true;
}
