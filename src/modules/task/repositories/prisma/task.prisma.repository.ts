// Implementação do repositório de tarefas usando Prisma
import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../task.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateTaskDto, TaskCreateDto } from "../../dto/create-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";
import { FilterTaskDto } from "../../dto/filter-task.dto";




@Injectable()
export class TaskPrismaRepository implements TaskRepository {
    constructor(private readonly prismaService: PrismaService) {}

    // async findAll(userId: string): Promise<TaskCreateDto[] | null> {
    //     return await this.prismaService.task.findMany({
    //         where: { userId },
    //         include: { employee: true, employeeResponsible: true }
    //     });
    // }

    async findOne(id: string): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.findUnique({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async deleteById(id: string): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.delete({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async updateBydId(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.update({
            where: { id },
            data: updateTaskDto,
            include: { employee: true, employeeResponsible: true }
        })
    }

    async save(createTaskDto: CreateTaskDto): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.create({
            data: {
                ...createTaskDto,
                // deadline: new Date(createTaskDto.deadline),
            },
        })
    }

    // Filtragens
    async findFilters(filters: FilterTaskDto): Promise<TaskCreateDto[] | null> {
        const { status, priority, userId, userIdResponsible } = filters;

        const where: any = {};

        if (status) {
            where.status = status;
        }

        if (priority) {
            where.priority = priority;
        }

        if (userId) {
            where.userId = userId;
        }

        if (userIdResponsible) {
            where.userIdResponsible = userIdResponsible;
        }

        return await this.prismaService.task.findMany({
            where
        })
    }
}