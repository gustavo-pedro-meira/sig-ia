

// DTO para atualização de tarefas, com validações opcionais
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { TaskPriority, TaskStatus } from "generated/prisma";


export class UpdateTaskDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    title: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    description: string;

    @IsDate()
    @IsOptional()
    deadline: Date;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: TaskStatus;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority: TaskPriority;

    @IsString()
    @IsOptional()
    userId?: string | null;

    @IsString()
    @IsOptional()
    userIdResponsible?: string | null;

    @IsOptional()
    @IsNotEmpty()
    points?: number;
}

