import { Module } from "@nestjs/common";
import { DepartmentController } from "./department.controller";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { DepartmentRepository } from "./repositories/department.repository";
import { DepartmentPrismaRepository } from "./repositories/prisma/department.prisma.repository";


@Module({
    imports: [],
    controllers: [DepartmentController],
    providers: [
        CreateDepartmentUseCase,
        PrismaService,
        {
            provide: DepartmentRepository,
            useClass: DepartmentPrismaRepository,
        }
    ],
})
export class DepartmentModule {}