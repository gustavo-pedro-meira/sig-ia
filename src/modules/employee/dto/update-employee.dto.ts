import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { UpdateEmployeeSchema } from "../schemas/update-employee.schema";


export class UpdateEmployeeDto extends createZodDto(UpdateEmployeeSchema){

}
