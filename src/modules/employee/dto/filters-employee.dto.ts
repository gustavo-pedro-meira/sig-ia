import { IsEnum, IsOptional } from "class-validator";
import { Position } from "generated/prisma";
import { OrderingEmployeeDto } from "./ordering-employee.dto";


export class FilterEmployeeDto extends OrderingEmployeeDto {
    @IsOptional()
    fullName: string;

    @IsEnum(Position)
    @IsOptional()
    position: Position;

    @IsOptional()
    departmentId: string;
}