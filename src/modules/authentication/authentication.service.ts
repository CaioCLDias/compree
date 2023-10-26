import { Injectable, UnauthorizedException  } from '@nestjs/common';
import { AuthenticationDto } from './dto/authentication.dto';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UserPayload {
  id: string;
  userName: string;
}


@Injectable()
export class AuthenticationService {

  constructor(
    private userService: UserService,
    private jwtService: JwtService
    ){}
  
  async login(email: string, password: string) {

    const user = await this.userService.findByEmail(email)

    const authentication = await bcrypt.compare(password, user.password);

    if (!authentication) {

      throw new UnauthorizedException('Email ou senna incorretos')

    }

    const payload: UserPayload = {
      id: user.id,
      userName: user.name
    }

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };


  }

}
