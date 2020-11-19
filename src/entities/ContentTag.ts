import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';

import { BaseEntity, Content } from '.';

interface ttt {
  name: string
}

@Entity()
export class ContentTag extends BaseEntity {
  @ManyToMany(() => Content, content => content.tags)
  contents = new Collection<Content>(this);

  @Property()
  name: string;

  // 别名
  @Property()
  alias: string

  @Property()
  comments: string;

  constructor({name = ''}: ttt) {
    super()
    console.log(name)
    this.name = name
  }
}
