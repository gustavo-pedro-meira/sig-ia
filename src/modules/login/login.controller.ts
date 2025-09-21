import { Body, Controller, Post } from "@nestjs/common";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { SignInDto } from "./dto/sign-in.dto";

@Controller('login')
export class LoginController {
    constructor(private readonly signInUseCase: SignInUseCase) {}

    @Post('token')
    signIn(@Body() signInDto: SignInDto) {
        return this.signInUseCase.execute(signInDto);
    }
}