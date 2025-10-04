// DTO para criação de tarefas, com validações class-validator
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength, IsNumber, Min, Max } from "class-validator";
import { Type } from "class-transformer";
import { TaskPriority, TaskStatus } from "generated/prisma";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description: string;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    deadline: Date;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority;

    @IsNumber()
    @Min(0)
    @Max(23)
    hour: number;

    @IsNumber()
    @Min(0)
    @Max(59)
    minute: number;

    @IsString()
    @IsOptional()
    userId?: string | null;
}

export class TaskCreateDto extends CreateTaskDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}