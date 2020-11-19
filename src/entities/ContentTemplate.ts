import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';

import { BaseEntity } from '.';
import { ContentCategory } from './';

@Entity()
export class ContentTemplate extends BaseEntity {
  @OneToMany(
    () => ContentCategory,
    (contentCategory) => contentCategory.contentTemplate,
  )
  contentCategory = new Collection<ContentCategory>(this);
}
