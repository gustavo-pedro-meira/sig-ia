import { Body, Controller, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { CreateTaskDto } from "./dto/create-task.dto";


@Controller('tasks')
export class TaskController {
    constructor(private readonly createTaskUseCase: CreateTaskUseCase) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.createTaskUseCase.execute(createTaskDto);
    }
}