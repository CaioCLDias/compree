import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './authentication.service';


export interface RequestUser extends Request {
  user: UserPayload;
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<RequestUser>();

    const token = this.tokenHeader(request)

    if (!token) {

      throw new UnauthorizedException('Erro de autenticação')

    }

    try {

      const payload: UserPayload = await this.jwtService.verifyAsync(token);

      request.user = payload;


    } catch (error) {
      console.error(error);
      throw new UnauthorizedException('JWT inválido');

    }

    return true;

  }

  private tokenHeader(request: Request): string | undefined {

    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;

  }

}
