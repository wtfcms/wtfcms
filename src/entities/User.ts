import { Entity, Property } from 'mikro-orm';

import { BaseEntity } from './';

@Entity()
export class User extends BaseEntity {
  // 昵称
  @Property()
  name: string;

  // 用户名
  @Property()
  username: string;

  // 用户密码
  @Property()
  password: string;

  // 备注
  @Property()
  comments: string = '';
}
