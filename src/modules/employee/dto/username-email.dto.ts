import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class UsernameAndEmailDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}