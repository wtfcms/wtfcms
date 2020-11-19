import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        const ctx = context.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();

        if (request.method === 'GET') {
          if (Array.isArray(data)) {
            const offset = Number(request.query['offset']) || 0;
            const limit = Number(request.query['limit']) || 10;
            const [collection, count] = data;

            return {
              collection,
              count,
              offset,
              limit,
            };
          }
        }

        return data;
      }),
    );
  }
}
