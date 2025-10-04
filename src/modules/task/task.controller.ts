import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskUseCase } from "./useCases/delete-task.usecase";
import { FindAllTaskUseCase } from "./useCases/find-all-task.usecase";


@Controller('tasks')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly findAllTaskUseCase: FindAllTaskUseCase,
    ) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.createTaskUseCase.execute(createTaskDto);
    }

    @Delete(':id')
    deleteByIdTask(@Param('id') id: string) {
        return this.deleteTaskUseCase.execute(id);
    }

    @Get()
    findAllTasks() {
        return this.findAllTaskUseCase.execute();
    }
}