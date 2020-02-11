import { IsEmail } from 'class-validator';
import { Entity, Property } from 'mikro-orm';

import { BaseEntity } from './BaseEntity';

@Entity()
export class AdminResource extends BaseEntity {
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
}
