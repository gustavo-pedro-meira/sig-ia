import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";
import { UpdateTaskDto } from "../dto/update-task.dto";
import { NotFoundError } from "rxjs";



@Injectable()
export class UpdateTaskUseCase {
    constructor(private readonly taskRepository: TaskRepository)  {}

    async execute(id: string, updateTaskDto: UpdateTaskDto) {
        const taskExits = await this.taskRepository.findOne(id);

        if (!taskExits) {
        throw new NotFoundException('Task not found');
        }

        return await this.taskRepository.updateBydId(id, updateTaskDto);
    }
}