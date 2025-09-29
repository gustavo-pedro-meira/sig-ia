import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { CreateEmployeeSchema } from "../schemas/create-employee.schema";


export class CreateEmployeeDto extends createZodDto(CreateEmployeeSchema) {

}



export class EmployeeCreateDto extends CreateEmployeeDto {
  // @ApiProperty({
  //   description: 'ID único do funcionário (gerado automaticamente)',
  //   example: 'clxnw123456789abcdefg',
  // })
  @IsString()
  id: string;

  // @ApiProperty({
  //   description: 'Data de criação do registro do funcionário',
  //   example: '2025-09-23T19:40:00.000Z',
  // })
  @IsDate()
  createdAt: Date;
} 