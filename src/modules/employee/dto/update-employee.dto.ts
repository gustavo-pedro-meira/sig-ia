import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { UpdateEmployeeSchema } from "../schemas/update-employee.schema";


export class UpdateEmployeeDto extends createZodDto(UpdateEmployeeSchema){
  @ApiProperty({
    description: 'Date of birth of the employee',
    example: '2004-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Expiration date of the employee contract',
    example: '2025-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  expirationDate: Date;
}
