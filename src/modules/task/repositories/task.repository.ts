import { Injectable } from "@nestjs/common";
import { CreateTaskDto, TaskCreateDto } from "../dto/create-task.dto";


@Injectable()
export abstract class TaskRepository {
    abstract findAll(): Promise<TaskCreateDto[] | null>
    abstract findOne(id: string): Promise<TaskCreateDto | null>;
    abstract deleteById(id: string): Promise<TaskCreateDto | null>;
    abstract save(createTaskDto: CreateTaskDto): Promise<TaskCreateDto | null>;
}