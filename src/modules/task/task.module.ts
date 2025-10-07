// Módulo do NestJS para gerenciamento de tarefas
import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { TaskRepository } from "./repositories/task.repository";
import { TaskPrismaRepository } from "./repositories/prisma/task.prisma.repository";
import { DeleteTaskUseCase } from "./useCases/delete-task.usecase";
import { FindOneTaskUseCase } from "./useCases/find-one-task.usecase";
import { UpdateTaskUseCase } from "./useCases/update-task.usecase";
import { TaskExpirationService } from "./services/task-expiration.service";
import { FindByIdEmployee } from "./useCases/find-task-by-idEmployee.usecase";
import { EmployeeRepository } from "../employee/repositories/employee.repository";
import { EmployeePrismaRepository } from "../employee/repositories/prisma/employee.prisma.repository";
import { TaskCreateGuard } from "src/infra/database/providers/task-create-guard.provide";


@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        FindOneTaskUseCase,
        UpdateTaskUseCase,
        TaskExpirationService,
        FindByIdEmployee,
        TaskCreateGuard,
        PrismaService,
        {
            provide: TaskRepository,
            useClass: TaskPrismaRepository
        },
        {
            provide: EmployeeRepository,
            useClass: EmployeePrismaRepository,
        }
    ],
})
export class TaskModule {}