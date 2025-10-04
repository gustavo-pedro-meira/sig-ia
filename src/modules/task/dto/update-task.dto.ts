

import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { PriorityTaskEnum, StatusTaskEnum } from "generated/prisma";


export class UpdateTaskDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    missionTask: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    descriptionTask: string;

    @IsDate()
    @IsOptional()
    @MinLength(3)
    deadlineTask: Date;

    @IsEnum(StatusTaskEnum)
    @IsOptional()
    statusTask: StatusTaskEnum;

    @IsEnum(PriorityTaskEnum)
    @IsOptional()
    priorityTask: PriorityTaskEnum;
}

