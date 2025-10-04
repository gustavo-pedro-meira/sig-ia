// Caso de uso para buscar todas as tarefas
import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";



@Injectable()
export class FindAllTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute() {
        return await this.taskRepository.findAll()
    }
}