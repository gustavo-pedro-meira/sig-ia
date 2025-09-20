import { Module } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";

@Module({
    imports: [],
    controllers: [],
    providers: [CreateEmployeeUseCase, PrismaService],
})
export class EmployeeModule{}