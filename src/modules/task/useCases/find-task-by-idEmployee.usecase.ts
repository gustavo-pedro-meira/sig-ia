import { Injectable } from "@nestjs/common";
import { TaskRepository } from "../repositories/task.repository";
import { FilterTaskDto } from "../dto/filter-task.dto";


@Injectable()
export class FindByIdEmployee {
    constructor(private readonly taskRepository: TaskRepository) {}

    async execute(filters: FilterTaskDto) {
        return await this.taskRepository.findFilters(filters);
    }
}