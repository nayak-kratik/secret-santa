import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Get the HTTP context (request & response objects)

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Extract status code from the exception or default to 500
    const status = exception.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    // Get the exception response message (could be string or object)
    const exceptionResponse = exception.getResponse();

    // Default message and error values
    let message = 'Internal server error';
    let error = 'Error';

    if (typeof exceptionResponse === 'string') {
      // If response is a string, treat it as both message and error
      message = exceptionResponse;
      error = exceptionResponse;
    } else if (exceptionResponse && typeof exceptionResponse === 'object') {
      // Extract message and error from the object, fallback to defaults if not present
      message = (exceptionResponse as any).message || message;
      error = (exceptionResponse as any).error || error;
    }

    // Send JSON response with all details
    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
