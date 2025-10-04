// DTO para validação dos dados de login (email e senha)
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class SignInDto {
    @ApiProperty({
      description: 'Email of the employee',
      example: 'gustavo123@gmail.com',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password of the employee',
        example: 'Gusta123!',
    })
    @IsNotEmpty()
    @MinLength(8)
    @IsString()
    password: string;
}