import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./repositories/employee.repository";
import { EmployeePrismaRepository } from "./repositories/prisma/employee.prisma.repository";

@Module({
    imports: [],
    controllers: [EmployeeController],
    providers: [CreateEmployeeUseCase, PrismaService, {
        provide: EmployeeRepository,
        useClass: EmployeePrismaRepository,
    }],
})
export class EmployeeModule{}