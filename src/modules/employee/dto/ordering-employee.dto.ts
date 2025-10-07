import { IsIn, IsOptional, IsString } from "class-validator"

export class OrderingEmployeeDto {
    @IsOptional()
    @IsString()
    @IsIn(['score', 'fullName', 'dateOfBirth', 'gender', 'position'])
    readonly sortBy?: 'score' | 'fullName' | 'dateOfBirth' | 'gender' | 'position' = 'score';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    readonly order?: 'asc' | 'desc' = 'desc';
}