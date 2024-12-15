import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse; // If the message is a plain string
      } else if (
        typeof exceptionResponse === 'object' &&
        (exceptionResponse as any).message
      ) {
        // If the message is an array of errors (ValidationPipe)
        message = Array.isArray((exceptionResponse as any).message)
          ? (exceptionResponse as any).message.join(', ')
          : (exceptionResponse as any).message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(status).json({
      status,
      message,
      data: null, // No data on error
    });
  }
}
