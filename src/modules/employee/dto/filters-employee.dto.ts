import { IsEnum, IsOptional } from "class-validator";
import { Position } from "generated/prisma";


export class FilterEmployeeDto {
    @IsOptional()
    fullName: string;

    @IsEnum(Position)
    @IsOptional()
    position: Position;

    @IsOptional()
    departmentId: string;
}