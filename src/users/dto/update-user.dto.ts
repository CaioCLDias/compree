import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsNotEmpty({ message: 'O nome não pode ser vazio' })
    @IsOptional()
    nome: string;
  
    @IsEmail(undefined, { message: 'O e-mail informado é inválido' })
    @IsOptional()
    email: string;
  
    @MinLength(6, { message: 'A senha precisa ter pelo menos 6 caracteres' })
    @IsOptional()
    senha: string
}
