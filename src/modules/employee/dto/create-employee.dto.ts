import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";


export class CreateEmployeeDto {
  @ApiProperty({
    description: 'Unique username for the employee',
    example: 'gustavo123',

  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @ApiProperty({
    description: 'Employee email address',
    example: 'gustavo123@gmail.com.br',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Password for the employee account',
    example: 'Gusta123!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;


  @ApiProperty({
    description: 'Full name of the employee',
    example: 'Gustavo Pedro Meira',
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    description: 'Date of birth of the employee',
    example: '2004-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;

  @ApiProperty({
    description: 'Gender of the employee',
    example: 'Masculino',
    enum: GenderEmployeeEnum,
  })
  @IsNotEmpty()
  @IsEnum(GenderEmployeeEnum)
  gender: GenderEmployeeEnum;

  @ApiProperty({
    description: 'Contact phone number of the employee',
    example: '5583912345678',
  })
  @IsString()
  phone: string;

  @ApiProperty({
    description: 'Position or role of the employee within the department',
    example: 'Secretario',
    enum: CargoEmployeeEnum,
  })
  @IsNotEmpty()
  @IsEnum(CargoEmployeeEnum)
  cargo: CargoEmployeeEnum;

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