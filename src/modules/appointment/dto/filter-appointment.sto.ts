import { IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "generated/prisma";


export class FilterAppointmentDto {
    @IsOptional()
    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @IsOptional()
    userId: string;

    @IsOptional()
    userIdResponsible:  string;
}