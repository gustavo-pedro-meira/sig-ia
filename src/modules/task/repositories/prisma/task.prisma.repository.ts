// Implementação do repositório de tarefas usando Prisma
import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../task.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateTaskDto, TaskCreateDto } from "../../dto/create-task.dto";
import { UpdateTaskDto } from "../../dto/update-task.dto";



@Injectable()
export class TaskPrismaRepository implements TaskRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(userId: string): Promise<TaskCreateDto[] | null> {
        return await this.prismaService.task.findMany({
            where: { userId },
            include: { employee: true, employeeResponsible: true }
        });
    }

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
}