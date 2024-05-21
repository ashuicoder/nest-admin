import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { IResponse } from 'src/types';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, IResponse> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    return next
      .handle()
      .pipe(map((data) => ({ code: 0, message: 'success', data })));
  }
}
