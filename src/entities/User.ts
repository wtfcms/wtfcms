import { Entity, Property } from 'mikro-orm';
import { BaseEntity } from './';

@Entity()
export class User extends BaseEntity {
  // 判断用户是否有效
  @Property({
    default: true,
  })
  enable: boolean;

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
  email: string;

  // QQ
  @Property()
  qq: number;

  // 手机号码
  @Property()
  phone: string;

  // 国家代码
  @Property()
  countryCode: string;
}
