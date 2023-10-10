import { Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExeptionFilter {

    constructor(private adapterHost: HttpAdapterHost) { }

    catch(exception: unknown, host: ArgumentsHost) {

        const { httpAdapter } = this.adapterHost;

        const context = host.switchToHttp();

        const response = context.getResponse();

        const request = context.getRequest();

        const { status, body } =
            exception instanceof HttpException
                ? {
                    status: exception.getStatus(),
                    body: exception.getResponse(),
                }
                : {
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    body: {
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        timestap: new Date().toString(),
                        path: httpAdapter.getRequestUrl(request),
                    },
                };

        httpAdapter.reply(response, body, status);

    }

}