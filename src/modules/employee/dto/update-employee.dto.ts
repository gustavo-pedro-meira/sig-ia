import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";


export class UpdateEmployeeDto {
  @ApiProperty({
    description: 'Unique username for the employee',
    example: 'gustavo123',

  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'Employee email address',
    example: 'gustavo123@gmail.com.br',
  })
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Password for the employee account',
    example: 'Gusta123!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;


  @ApiProperty({
    description: 'Full name of the employee',
    example: 'Gustavo Pedro Meira',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'Date of birth of the employee',
    example: '2004-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;

  @ApiProperty({
    description: 'Gender of the employee',
    example: 'Masculino',
    enum: GenderEmployeeEnum,
  })
  @IsNotEmpty()
  @IsEnum(GenderEmployeeEnum)
  @IsOptional()
  gender?: GenderEmployeeEnum;

  @ApiProperty({
    description: 'Contact phone number of the employee',
    example: '5583912345678',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    description: 'Position or role of the employee within the department',
    example: 'Secretario',
    enum: CargoEmployeeEnum,
  })
  @IsNotEmpty()
  @IsEnum(CargoEmployeeEnum)
  @IsOptional()
  cargo?: CargoEmployeeEnum;

  @ApiProperty({
    description: 'Expiration date of the employee contract',
    example: '2025-08-16',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @IsOptional()
  expirationDate?: Date;
}
