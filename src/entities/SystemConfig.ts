import { IsEmail } from 'class-validator';
import { Entity, Property, ManyToOne } from '@mikro-orm/core';

import { BaseEntity, AdminUser } from '.';

@Entity()
export class SystemConfig extends BaseEntity {
  @Property({ default: 'wtfcms' })
  siteName: string = 'wtfcms';

  @Property({ default: false })
  showImgCode: boolean = false;
}
