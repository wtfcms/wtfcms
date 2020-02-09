import { IsEmail } from 'class-validator';
import { Entity, Property } from 'mikro-orm';

import { BaseEntity } from './BaseEntity';

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

  constructor(name: string, email: string) {
    super();
    // this.title = name;
    // this.email = email;
  }
}
