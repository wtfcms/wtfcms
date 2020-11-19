import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import _ from 'lodash'

export const PUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request['user'][data] : request['user'];
  },
);

export const PUid = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request['user']['uid'];
});

export const PIds = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request['params']['ids'].split(',');
});

export const QueryOption = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const dictionaries = ['offset', 'limit']
  const queries = request['query']

  const obj = {}
  for (const item of dictionaries) {
    if (!!queries[item]) {
      obj[item] = queries[item]
    }
  }
  
  return obj
});