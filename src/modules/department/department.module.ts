import { Module } from "@nestjs/common";
import { DepartmentController } from "./department.controller";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { DepartmentRepository } from "./repositories/department.repository";
import { DepartmentPrismaRepository } from "./repositories/prisma/department.prisma.repository";
import { UpdateDepartmentUseCase } from "./useCases/update-department.usecase";


@Module({
    imports: [],
    controllers: [DepartmentController],
    providers: [
        CreateDepartmentUseCase,
        UpdateDepartmentUseCase,
        PrismaService,
        {
            provide: DepartmentRepository,
            useClass: DepartmentPrismaRepository,
        }
    ],
})
export class DepartmentModule {}