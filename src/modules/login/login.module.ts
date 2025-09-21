import { Module } from "@nestjs/common";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { LoginController } from "./login.controller";
import { JwtModule } from "@nestjs/jwt";


@Module ({
    imports: [JwtModule.register({
        global: true,
        secret: "curso_nestJS",
        signOptions: { expiresIn: '5m' }
    })],
    controllers: [LoginController],
    providers: [SignInUseCase, PrismaService],
})
export class LoginModule {}