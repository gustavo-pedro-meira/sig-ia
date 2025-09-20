import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { EmployeeController } from "./employee.controller";

@Module({
    imports: [],
    controllers: [EmployeeController],
    providers: [CreateEmployeeUseCase, PrismaService],
})
export class EmployeeModule{}