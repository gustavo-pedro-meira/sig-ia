import { IsIn, IsOptional } from "class-validator";

export class OrderingTaskDto {
    @IsOptional()
    readonly sortBy?: 'deadline' = 'deadline';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    readonly order?: 'asc' | 'desc' = 'desc';
}