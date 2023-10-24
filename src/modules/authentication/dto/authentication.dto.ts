import { IsEmail, IsNotEmpty } from "class-validator";

export class AuthenticationDto {

    @IsEmail(undefined, {message: "Insira um email valido"})
    email: string;

    @IsNotEmpty({message: "O campo senha não pode estar vazio"})
    password: string;
    
}
