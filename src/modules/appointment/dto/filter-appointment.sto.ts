import { IsEnum, IsOptional } from "class-validator";
import { AppointmentStatus } from "generated/prisma";
import { OrderingAppointmentDto } from "./ordering-appointment.dto";


export class FilterAppointmentDto extends OrderingAppointmentDto {
    @IsOptional()
    @IsEnum(AppointmentStatus)
    status: AppointmentStatus;

    @IsOptional()
    userId: string;

    @IsOptional()
    userIdResponsible:  string;
}