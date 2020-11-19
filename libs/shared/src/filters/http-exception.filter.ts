import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let code, message, path;
    if (exception instanceof HttpException) {
      code = exception['response'].code || Number(`${status}000`);
      message = exception['response'].message;
      path = `${request.method} ${request.path}`;
    } else {
      code = Number(`${HttpStatus.INTERNAL_SERVER_ERROR}000`);
      message = '服务器错误';
      path = `${request.method} ${request.path}`;
    }

    response.status(status).json({
      code,
      message,
      path,
    });
  }
}
