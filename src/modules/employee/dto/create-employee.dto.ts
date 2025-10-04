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