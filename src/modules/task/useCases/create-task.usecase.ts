// Caso de uso para criar uma nova tarefa
import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";
import { CreateTaskDto } from "../dto/create-task.dto";



@Injectable()
export class CreateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}
    async execute(createTaskDto: CreateTaskDto) {
        return await this.taskRepository.save(createTaskDto);
    }
}