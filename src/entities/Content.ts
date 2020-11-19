import {
  Entity,
  ManyToOne,
  Property,
  OneToMany,
  Collection,
  ManyToMany,
  Cascade,
} from '@mikro-orm/core';

import { BaseEntity, ContentCategory } from './';
import { AdminUser } from './AdminUser';
import { ContentTag } from './ContentTag';
import { User } from './User';

@Entity()
export class Content extends BaseEntity {
  @ManyToOne(() => AdminUser)
  author: AdminUser;

  @ManyToOne(() => User)
  uAuthor: User;

  @Property()
  title: string;

  @Property()
  stitle: string;

  /**
   * 发布类型
   * 1 普通
   * 2 专题
   */
  @Property()
  type: string = '1';

  // 文章类别
  @ManyToMany(
    () => ContentCategory,
    (contentCategory) => contentCategory.contents,
    { owner: true },
  )
  categories = new Collection<ContentCategory>(this);

  // 存储所有父节点结构
  @Property()
  sortPath: string;

  // 标签
  @ManyToMany(() => ContentTag, (contentTag) => contentTag.contents, {
    owner: true,
  })
  tags = new Collection<ContentTag>(this);

  @Property()
  keywords: string[] = [];

  @Property()
  sImg: string = '/upload/images/defaultImg.jpg';

  /**
   * 首图类型
   * 1 自动生成
   * 2 本地上传
   */
  @Property()
  sImgType: string = '2';

  // 封面Id
  @Property()
  cover: string;

  // 视频缩略图
  @Property()
  videoImg: string = '';

  @Property()
  discription: string;

  /**
   * app端排版格式
   * 0 不显示图片
   * 1 小图
   * 2 大图
   * 3 视频
   */
  @Property()
  appShowType: string = '1';

  // 媒体集合（图片）
  @Property()
  imageArr: string[];

  // 媒体集合（影片）
  @Property()
  videoArr: string[];

  // 针对有视频的帖子时长
  @Property()
  duration: string = '0.01';

  /**
   * 0 草稿
   * 1 待审核
   * 2 审核通过
   * 3 下架
   */
  @Property()
  state: string = '0';

  /**
   * 是否进入回收站
   * 1 是
   * 0 否
   */
  @Property()
  draft: string = '0';

  // 驳回原因(针对审核不通过)
  @Property()
  dismissReason: string;

  /**
   * 是否推荐，默认不推荐
   * 0 不推荐
   * 1 推荐
   */
  @Property()
  isTop: number = 0;

  /**
   * 是否置顶，默认不置顶
   * 0 不置顶
   * 1 置顶
   */
  @Property()
  roofPlacement: string = '0';

  @Property()
  clickNum: number = 1;

  @Property()
  comments: string;

  // 带格式的纯文本
  @Property()
  simpleComments: string;

  // markdow格式
  @Property()
  markDownComments: string;

  // 评论数量
  @Property()
  commentNum: number = 0;

  // 喜欢数量
  @Property()
  likeNum: number = 0;
}
