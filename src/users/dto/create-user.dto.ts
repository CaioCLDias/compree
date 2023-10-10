import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';



export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsOptional()
  name: string;

  @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
  @IsOptional()
  email: string;

  @MinLength(6, { message: 'A senha precisa ter pelo menos 8 caracteres' })
  @IsOptional()
  password: string;
}