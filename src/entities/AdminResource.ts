import { IsEmail } from 'class-validator';
import { Entity, Property } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

@Entity()
export class AdminResource extends BaseEntity {
  @Property()
  label: string;

  /**
   * 0 普通菜单
   * 1 功能菜单
   */
  @Property()
  type: string;

  // 路由路径
  @Property()
  routePath: string;

  // icon 图标样式
  @Property()
  icon: string;

  // 模板路径
  @Property()
  componentPath: string;

  // 资源路径
  @Property()
  api: string;

  @Property()
  parentId: string;

  // 是否由插件安装而来
  @Property({ default: false })
  isExt: boolean = false;

  @Property({ default: true })
  enable: boolean = true;

  @Property({ default: 0 })
  sortId: number = 0;
}
