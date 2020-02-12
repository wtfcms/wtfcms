export function entityAll() {
  const EXCLUDE = ['entityAll', 'entityInclude', 'entityExclude'];
  const ret = [];

  for (let item of Object.keys(this)) {
    if (!EXCLUDE.includes(item)) {
      ret.push(this[item]);
    }
  }

  return ret;
}

export function entityInclude(params: string[] = []) {
  const ret = [];

  for (let item of Object.keys(this)) {
    if (params.includes(item)) {
      ret.push(this[item]);
    }
  }

  return ret;
}

export function entityExclude(params: string[] = []) {
  const all = entityAll.bind(this)();
  const ret = all.filter(item => !params.includes(item.name));

  return ret;
}

export * from './BaseEntity';

export * from './AdminUser';
export * from './AdminGroup';
export * from './AdminResource';

export * from './Content';
