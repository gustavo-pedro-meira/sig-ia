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

    async findOne(id: string): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.findUnique({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async deleteById(id: string): Promise<TaskCreateDto | null> {
        const taskExist = await this.prismaService.task.findUnique({
            where: { id },
        })
        if (!taskExist) {
            throw new NotFoundException('Task not found')
        }

        if (taskExist.userIdResponsible && taskExist.status === "Completed") {
            await this.prismaService.employee.update({
                where: { id: taskExist.userIdResponsible },
                data: {
                    score: { decrement: taskExist.points }
                }
            })
        }

        return await this.prismaService.task.delete({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async updateBydId(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskCreateDto | null> {
        const taskExist = await this.prismaService.task.findUnique({
            where: { id },
        })
        if (!taskExist) {
            throw new NotFoundException('Task not found')
        }

        const validationStatusTask = taskExist.status === "Expired";
        if (validationStatusTask) {
            throw new NotFoundException('Task expired')
        }

        const taskUpdate = await this.prismaService.task.update({
            where: { id },
            data: updateTaskDto,
            include: { employee: true, employeeResponsible: true }
        })
        if (taskUpdate.status === "Completed" && taskExist.status !== "Completed" && taskUpdate.userIdResponsible) {
            await this.prismaService.employee.update({
                where: { id: taskUpdate.userIdResponsible },
                data: {
                    score: { increment: taskUpdate.points }
                }
            })
        }

        return taskUpdate;
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
        const { status, priority, userId, userIdResponsible, sortBy = 'deadline', order = 'desc' } = filters;

        const orderBy = {
            [sortBy]: order,
        }

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
            where,
            include: { employee: true, employeeResponsible: true },
            orderBy: [
                orderBy,
            ]
        })
    }
}