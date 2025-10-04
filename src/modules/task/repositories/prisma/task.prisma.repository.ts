import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../task.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateTaskDto, TaskCreateDto } from "../../dto/create-task.dto";



@Injectable()
export class TaskPrismaRepository implements TaskRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<TaskCreateDto[] | null> {
        return await this.prismaService.task.findMany();
    }

    async findOne(id: string): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.findUnique({
            where: { id }
        })
    }

    async deleteById(id: string): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.delete({
            where: { id }
        })
    }

    async save(createTaskDto: CreateTaskDto): Promise<TaskCreateDto | null> {
        return await this.prismaService.task.create({
            data: createTaskDto,
        })
    }
}