import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";


@Injectable()
export class DeleteTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(id: string) {
        const taskExist = await this.taskRepository.findOne(id);

        if(!taskExist) {
            throw new NotFoundException('Task not found');
        }

        return await this.taskRepository.deleteById(id);
    }
}