import { Body, Controller, Delete, Param, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskUseCase } from "./useCases/delete-task.usecase";


@Controller('tasks')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
    ) {}

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto) {
        return this.createTaskUseCase.execute(createTaskDto);
    }

    @Delete(':id')
    deleteByIdTask(@Param('id') id: string) {
        return this.deleteTaskUseCase.execute(id);
    }
}