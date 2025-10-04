import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { PrismaService } from "src/infra/database/prisma.service";
import { TaskRepository } from "./repositories/task.repository";
import { TaskPrismaRepository } from "./repositories/prisma/task.prisma.repository";
import { DeleteTaskUseCase } from "./useCases/delete-task.usecase";


@Module({
    imports: [],
    controllers: [TaskController],
    providers: [
        CreateTaskUseCase,
        DeleteTaskUseCase,
        PrismaService,
        {
            provide: TaskRepository,
            useClass: TaskPrismaRepository
        }
    ],
})
export class TaskModule {}