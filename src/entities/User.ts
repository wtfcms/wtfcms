import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { BaseEntity, Content, Message, ContentTag } from './';

@Entity()
export class User extends BaseEntity {
  // 用户是否有效
  @Property()
  enable: boolean = true;

  @Property()
  name: string;

  @Property()
  username: string;

  @Property()
  password: string;
  // password: {
  //   type: String,
  //   set(val) {
  //     return CryptoJS.AES.encrypt(val, app.config.encrypt_key).toString();
  //   }
  // },

  @Property()
  email: string;

  @Property()
  qq: number;

  @Property()
  phone: string;

  @Property()
  countryCode: string;

  @Property()
  idNo: number;

  /**
   * 证件类型
   * 1 身份证
   */
  @Property()
  idType: string = '1';

  @Property()
  comments: string = '';

  // 个人简介
  @Property()
  introduction: string = '';

  // 职位
  @Property()
  position: string;

  // 职业
  @Property()
  profession: string;

  // 行业
  @Property()
  industry: string;

  // 教育经历
  @Property()
  experience: string;

  // 大学或公司
  @Property()
  company: string;

  // 个人站点
  @Property()
  website: string;

  @Property()
  logo: string = '/static/upload/images/defaultlogo.png';

  /**
   * 0 普通用户
   */
  @Property()
  group: string = '0';

  // 所在省份
  @Property()
  province: string;

  // 所在城市
  @Property()
  city: string;

  // 出生年月日
  @Property()
  birth: Date = new Date('1770-01-01');

  /**
   * 性别
   * 0 男
   * 1 女
   */
  @Property()
  gender: string = '0';

  // 文章或帖子
  // @OneToMany(() => Content, (content) => content.uAuthor)
  // despises = new Collection<Content>(this);

  // 评论
  @OneToMany(() => Message, (message) => message.author)
  despiseMessage = new Collection<Message>(this);

  // 收藏的文章或帖子
  @ManyToMany(() => Content)
  favorites: Collection<Content> = new Collection<Content>(this);

  // 点赞的文章或帖子
  @ManyToMany(() => Content)
  praiseContents: Collection<Content> = new Collection<Content>(this);

  // 点赞的评论
  @ManyToMany(() => Message)
  praiseMessages: Collection<Message> = new Collection<Message>(this);

  /**
   * 1 正常
   * 0 删除
   */
  @Property()
  state: string = '1';

  // 关注我的创作者
  @ManyToMany(() => User)
  followers: Collection<User> = new Collection<User>(this);

  // 我关注的创作者
  @ManyToMany(() => User)
  watchers: Collection<User> = new Collection<User>(this);

  // 我关注的标签
  @ManyToMany(() => ContentTag)
  watchTags: Collection<ContentTag> = new Collection<ContentTag>(this);

  // 用户发送激活请求时间
  @Property()
  retrieve_time: number;

  // 首次登录
  @Property()
  loginActive: boolean = false;

  // 针对游客的设备Id
  @Property()
  deviceId: string;
}
