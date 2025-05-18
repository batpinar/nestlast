import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map(data => ({ success: true, data })),
      catchError(err => {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Internal server error';
         if (err instanceof HttpException) {
          status = err.getStatus();

          const response = err.getResponse();

          if (typeof response === 'object' && response !== null) {
            message = (response as any).message ?? message;
          } else if (typeof response === 'string') {
            message = response;
          }
        }
        
        console.error('HATA:', err)
        return throwError(() => new HttpException({
          status,
          message,
          error: HttpStatus[status] || 'Error',
          // error: err.message,
        }, status));
      })
    );
  }
}

//@UseInterceptors(TransformInterceptor) // This decorator can be used in the controller to apply the interceptor to specific routes