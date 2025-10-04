// Controlador responsável pelo login de usuários, gerando tokens JWT
import { Body, Controller, Post } from "@nestjs/common";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('login')
export class LoginController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    @ApiOperation({ summary: 'Sign in an employee and receive a JWT token' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully signed in and received a token.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid email or password.' })
    @Post('token')
    signIn(@Body() signInDto: SignInDto) {
        return this.signInUseCase.execute(signInDto);
    }
}