import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/interface';
import { HTTP_DEFAULT_SUCCESS_TEXT } from 'src/constant';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(map(data => ({ code: HttpStatus.OK, data, errno: '0', msg: HTTP_DEFAULT_SUCCESS_TEXT })));
  }
}
