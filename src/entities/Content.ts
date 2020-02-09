import { Entity, Property } from 'mikro-orm';

import { BaseEntity } from './';

@Entity()
export class Content extends BaseEntity {
  @Property()
  author: string;
}
