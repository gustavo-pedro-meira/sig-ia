import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { EmployeeController } from "./employee.controller";
import { EmployeeRepository } from "./repositories/employee.repository";
import { EmployeePrismaRepository } from "./repositories/prisma/employee.prisma.repository";
import { FindAllEmployeeUseCase } from "./useCases/find-all-employee.usecase";
import { FindOneEmployeeUseCase } from "./useCases/find-one-employee.usecase";
import { UpdateEmployeeUseCase } from "./useCases/update-employee.usecas";
import { DeleteEmployeeUseCase } from "./useCases/delete-employee.usecase";
import { GetMeUseCase } from "./useCases/get-me.usecase";

@Module({
    imports: [],
    controllers: [EmployeeController],
    providers: [
        CreateEmployeeUseCase,
        FindAllEmployeeUseCase,
        FindOneEmployeeUseCase,
        UpdateEmployeeUseCase,
        DeleteEmployeeUseCase,
        GetMeUseCase,
        PrismaService,
        {
            provide: EmployeeRepository,
            useClass: EmployeePrismaRepository,
        },
    ],
})
export class EmployeeModule{}