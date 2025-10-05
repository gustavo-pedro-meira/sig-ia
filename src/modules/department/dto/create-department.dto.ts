import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateDepartmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    sector: string;
}

export class DepartmentCreateDto extends CreateDepartmentDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}