import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Common timestamp for all responses
    const timestamp = new Date().toISOString();

    // Default to 500 Internal Server Error
    switch ((exception as any).code) {
      case '23505': // Unique constraint violation
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: 'Duplicate entry found',
          timestamp,
          path: request.url,
        });
        break;

      case '23503': // Foreign key violation
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: 'Invalid foreign key: Related entity not found',
          timestamp,
          path: request.url,
        });
        break;

      // Add more if needed
      default: // Handle other database errors
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Internal Server Error',
          message: 'Internal server error',
          timestamp,
          path: request.url,
        });
        break;
    }
  }
}
