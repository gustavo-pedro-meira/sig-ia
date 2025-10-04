import { IsDate, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { PriorityTaskEnum, StatusTaskEnum } from "generated/prisma";


export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    missionTask: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    description: string;

    @IsDate()
    @IsNotEmpty()
    @MinLength(3)
    deadlineTask: Date;

    @IsEnum(StatusTaskEnum)
    @IsNotEmpty()
    statusTask: StatusTaskEnum;

    @IsEnum(PriorityTaskEnum)
    @IsNotEmpty()
    priorityTask: PriorityTaskEnum;
}

export class TaskCreateDto extends CreateTaskDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}