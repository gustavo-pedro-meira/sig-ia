import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { CreateEmployeeSchema } from "../schemas/create-employee.schema";


export class CreateEmployeeDto extends createZodDto(CreateEmployeeSchema) {
  @ApiProperty({
    description: 'Date of birth of the employee',
    example: '2004-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Expiration date of the employee contract',
    example: '2025-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  expirationDate: Date;
}



export class EmployeeCreateDto extends CreateEmployeeDto {
  @IsString()
  id: string;

  @IsDate()
  createdAt: Date;
} 