// Módulo de login, configura JWT e provedores para autenticação
import { Module } from "@nestjs/common";
import { SignInUseCase } from "./useCases/sign-in.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { LoginController } from "./login.controller";
import { JwtModule } from "@nestjs/jwt";
import { EmployeeRepository } from "../employee/repositories/employee.repository";
import { EmployeePrismaRepository } from "../employee/repositories/prisma/employee.prisma.repository";


@Module ({
    imports: [JwtModule.register({
        global: true,
        secret: "curso_nestJS",
        signOptions: { expiresIn: '50m' }
    })],
    controllers: [LoginController],
    providers: [SignInUseCase, PrismaService, {
        provide: EmployeeRepository,
        useClass: EmployeePrismaRepository,
    }],
})
export class LoginModule {}