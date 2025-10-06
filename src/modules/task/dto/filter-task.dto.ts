import { IsEnum, IsOptional } from "class-validator"
import { TaskPriority, TaskStatus } from "generated/prisma"


export class FilterTaskDto {
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