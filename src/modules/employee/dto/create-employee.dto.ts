import { Type } from "class-transformer";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from "class-validator";
import { CargoEmployeeEnum, GenderEmployeeEnum } from "generated/prisma";


export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;


  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  dateOfBirth: Date;

  @IsNotEmpty()
  @IsEnum(GenderEmployeeEnum)
  gender: GenderEmployeeEnum;

  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(CargoEmployeeEnum)
  cargo: CargoEmployeeEnum;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  expirationDate: Date;
}