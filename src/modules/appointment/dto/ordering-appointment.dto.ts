import { IsIn, IsOptional, IsString } from "class-validator";



export class OrderingAppointmentDto {
    @IsOptional()
    @IsString()
    @IsIn(['deadline'])
    readonly sortBy?: 'deadline' = 'deadline';

    @IsOptional()
    @IsString()
    @IsIn(['asc', 'desc'])
    readonly order?: 'asc' | 'desc' = 'desc'
}