import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateTaskUseCase } from "./useCases/create-task.usecase";
import { CreateTaskDto } from "./dto/create-task.dto";
import { DeleteTaskUseCase } from "./useCases/delete-task.usecase";
import { FindAllTaskUseCase } from "./useCases/find-all-task.usecase";
import { FindOneTaskUseCase } from "./useCases/find-one-task.usecase";
import { UpdateTaskUseCase } from "./useCases/update-task.usecase";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Controller('tasks')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase,
        private readonly deleteTaskUseCase: DeleteTaskUseCase,
        private readonly findAllTaskUseCase: FindAllTaskUseCase,
        private readonly findOneTaksUseCase: FindOneTaskUseCase,
        private readonly updateTaskUseCase: UpdateTaskUseCase,
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

    @Get(':id')
    findOneTask(@Param('id') id: string) {
        return this.findOneTaksUseCase.execute(id);
    }

    @Put(':id')
    updateByIdTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
        return this.updateTaskUseCase.execute(id, updateTaskDto);
    }
}