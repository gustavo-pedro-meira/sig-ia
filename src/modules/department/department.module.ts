import { Module } from "@nestjs/common";
import { DepartmentController } from "./department.controller";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { DepartmentRepository } from "./repositories/department.repository";
import { DepartmentPrismaRepository } from "./repositories/prisma/department.prisma.repository";
import { UpdateDepartmentUseCase } from "./useCases/update-department.usecase";
import { DeleteDepartmentUseCase } from "./useCases/delete-department.usecase";
import { FindAllDepartmentUseCase } from "./useCases/find-all-department.usecase";
import { FindOneDepartmentUseCase } from "./useCases/find-one-department.usecase";


@Module({
    imports: [],
    controllers: [DepartmentController],
    providers: [
        CreateDepartmentUseCase,
        UpdateDepartmentUseCase,
        DeleteDepartmentUseCase,
        FindAllDepartmentUseCase,
        FindOneDepartmentUseCase,
        PrismaService,
        {
            provide: DepartmentRepository,
            useClass: DepartmentPrismaRepository,
        }
    ],
})
export class DepartmentModule {}