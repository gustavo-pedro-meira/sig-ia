import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";
import { NotFoundError } from "rxjs";


@Injectable()
export class FindOneTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(id: string) {
        const taskExist = await this.taskRepository.findOne(id);

        if (!taskExist) {
            throw new NotFoundException('Task not found')
        }

        return await this.taskRepository.findOne(id);
    }
}