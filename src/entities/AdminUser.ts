import { IsEmail } from 'class-validator';
import {
  Entity,
  Property,
  OneToMany,
  OneToOne,
  Collection,
  Cascade,
  ManyToOne,
} from '@mikro-orm/core';

import { BaseEntity, AdminGroup } from './';

@Entity()
export class AdminUser extends BaseEntity {
  // 昵称
  @Property()
  name: string;

  // 用户名
  @Property()
  username: string;

  // 密码
  @Property()
  password: string;

  // 邮箱
  @Property()
  @IsEmail()
  email: string;

  // 手机号码
  @Property({ length: 11 })
  phone: string;

  // 备注
  @Property()
  comments: string;

  // 头像
  @Property()
  avatar: string;

  // LOGO
  @Property()
  logo: string;

  @Property()
  enable: boolean = true;

  // @Property()
  @ManyToOne(() => AdminGroup)
  group: AdminGroup;
}
