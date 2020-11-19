import {
  Cascade,
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '.';
import { Content } from './Content';
import { ContentTemplate } from './ContentTemplate';
import { User } from './User';

@Entity()
export class ContentCategory extends BaseEntity {
  @Property()
  uid: number = 0;

  @Property()
  name: string;

  @Property()
  keywords: string;

  /**
   * 1
   * 2 单页面
   */
  @Property()
  type: string = '1';

  // 排序
  @Property()
  sortId: number = 1;

  // @Property()
  // parentId: string = '0';
  // @OneToMany()
  // subContentCategories: C
  @OneToMany(
    () => ContentCategory,
    (contentCategory) => contentCategory.parentContentCategory,
  )
  subContentCategories = new Collection<ContentCategory>(this);

  @ManyToOne(() => ContentCategory) // plain decorator is enough, type will be sniffer via reflection!
  parentContentCategory!: ContentCategory;

  /**
   * 是否公开
   * 默认为公开状态
   */
  @Property()
  enable: boolean = true;

  // 内容模板
  @ManyToOne(() => ContentTemplate)
  contentTemplate: ContentTemplate;

  // SEO link
  @Property()
  defaultUrl: string = '';

  // 必须唯一
  @Property()
  homePage: string = 'ui';

  // 存储所有父节点结构
  @Property()
  sortPath: string = '0';

  @Property()
  comments: string;

  @Property()
  sImg: string;

  @ManyToMany(() => Content, (content) => content.categories)
  contents = new Collection<Content>(this);
}
