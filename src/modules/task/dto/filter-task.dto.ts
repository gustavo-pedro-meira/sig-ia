import { IsEnum, IsOptional } from "class-validator"
import { TaskPriority, TaskStatus } from "generated/prisma"
import { OrderingTaskDto } from "./ordering-task.dto";


export class FilterTaskDto extends OrderingTaskDto {
    @IsOptional()
    userId?: string;

    @IsOptional()
    userIdResponsible?: string;

    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsEnum(TaskPriority)
    priority?: TaskPriority;
}