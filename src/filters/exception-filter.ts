import { Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExeptionFilter {

    catch(exception: unknown, host: ArgumentsHost) {

        const context = host.switchToHttp();

        const response = context.getResponse<Response>();

        const request = context.getRequest<Request>();

        const { status, body } =
            exception instanceof HttpException
                ? {
                    status: exception.getStatus(),
                    body: exception.getResponse(),
                }
                : {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: {
                        statusCode: HttpStatus. INTERNAL_SERVER_ERROR,
                        timestap: new Date().toString(),
                        path: request.url,
                    },
                };

        response.status(status).json(body);

    }

}