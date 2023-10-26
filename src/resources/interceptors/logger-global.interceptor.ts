import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { RequestUser } from 'src/modules/authentication/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) { }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const contextHttp = context.switchToHttp();

    const response = contextHttp.getResponse<Response>();

    const request = contextHttp.getRequest<
      Request | RequestUser
    >();

    const { path, method } = request;
    const { statusCode } = response;
    this.logger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(
            `Rota acessada pelo usuário: ${request.user.id}`,
          );
        }
        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;
        this.logger.log(
          `Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}ms`,
        );
      }),
    );
  }
}
