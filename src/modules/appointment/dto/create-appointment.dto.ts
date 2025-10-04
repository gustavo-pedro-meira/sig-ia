// DTO para criação de compromissos, com validações Zod
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AppointmentStatus } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { CreateAppointmentSchema } from "../schemas/create-appointment.schema";


export class CreateAppointmentDto extends createZodDto(CreateAppointmentSchema) {}

export class AppointmentCreateDto extends CreateAppointmentDto {
    @IsString()
    id: string;

    @IsDate()
    createdAt: Date;
}