// Interface abstrata para repositório de tarefas
import { Injectable } from "@nestjs/common";
import { CreateTaskDto, TaskCreateDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";


@Injectable()
export abstract class TaskRepository {
    abstract findAll(userId: string): Promise<TaskCreateDto[] | null>
    abstract findOne(id: string): Promise<TaskCreateDto | null>;
    abstract deleteById(id: string): Promise<TaskCreateDto | null>;
    abstract updateBydId(id: string, updateTaskDto: UpdateTaskDto): Promise<UpdateTaskDto | null>;
    abstract save(createTaskDto: CreateTaskDto): Promise<TaskCreateDto | null>;
}