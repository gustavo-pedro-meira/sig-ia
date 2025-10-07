// Controlador para gerenciar tarefas via API REST
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { CreateTaskUseCase } from './useCases/create-task.usecase';
import { CreateTaskDto } from './dto/create-task.dto';
import { DeleteTaskUseCase } from './useCases/delete-task.usecase';
import { FindOneTaskUseCase } from './useCases/find-one-task.usecase';
import { UpdateTaskUseCase } from './useCases/update-task.usecase';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/infra/database/providers/auth-guard.provider';
import { FindByIdEmployee } from './useCases/find-task-by-idEmployee.usecase';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskCreateGuard } from 'src/modules/task/guards/task-create.guard';
import { TaskDeleteGuard } from './guards/task-delete.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly deleteTaskUseCase: DeleteTaskUseCase,
    private readonly findOneTaksUseCase: FindOneTaskUseCase,
    private readonly updateTaskUseCase: UpdateTaskUseCase,
    private readonly findByIdEmployee: FindByIdEmployee,
  ) {}

  @Post()
  @UseGuards(TaskCreateGuard)
  createTask(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    createTaskDto.userId = req.user.sub;
    return this.createTaskUseCase.execute(createTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskDeleteGuard)
  deleteByIdTask(@Param('id') id: string) {
    return this.deleteTaskUseCase.execute(id);
  }

  @Get(':id')
  findOneTask(@Param('id') id: string) {
    return this.findOneTaksUseCase.execute(id);
  }

  @Put(':id')
  updateByIdTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.updateTaskUseCase.execute(id, updateTaskDto);
  }

  // Filtragens
  @Get()
  findTaskByEmployee(@Query() filters: FilterTaskDto) {
    return this.findByIdEmployee.execute(filters);
  }
}
