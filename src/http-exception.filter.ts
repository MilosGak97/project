import { ExceptionFilter, Catch, HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const message = exception.getResponse();

        response.status(status).json({
            success: false,
            ...(typeof message === 'object' ? message : { message }), // Only spread if message is an object
       });
    }
}
