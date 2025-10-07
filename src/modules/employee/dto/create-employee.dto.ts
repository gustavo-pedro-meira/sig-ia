// DTO para criação de funcionários, com validações Zod e class-validator
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Position, Gender } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { CreateEmployeeSchema } from "../schemas/create-employee.schema";


export class CreateEmployeeDto extends createZodDto(CreateEmployeeSchema) {}

export class EmployeeCreateDto extends CreateEmployeeDto {
  @IsString()
  id: string;

  @IsDate()
  createdAt: Date;
} 

export const positionHierarchy: Record<Position, number> = {
  [Position.Cabinet]: 5,
  [Position.Secretary]: 4,
  [Position.Technician1]: 3,
  [Position.Technician2]: 2,
  [Position.Technician3]: 1,
}