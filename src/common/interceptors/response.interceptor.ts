import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode || 200,
        data,
        message: 'Success',
        timestamp: new Date().toISOString(),
        path: request.url,
      })),
    );
  }
}
