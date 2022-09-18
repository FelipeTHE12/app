import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: any =
      exception instanceof HttpException ? exception.getResponse() : exception;

    if (status >= 400 && status < 500) {
      this.logger.warn(
        `Http Status: ${status} | Url: ${request.url}| Error Message: ${message.message}, `,
      );
    } else if (status >= 500) {
      this.logger.error(
        `Http Status: ${status} | Url: ${request.url} | Error Message: ${message.message}, `,
      );
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message.message,
    });
  }
}
