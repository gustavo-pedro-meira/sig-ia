// DTO para atualização de compromissos, com validações Zod
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { AppointmentStatus } from "generated/prisma";
import { createZodDto } from "nestjs-zod";
import { UpdateAppointmentSchema } from "../schemas/update-appointment.schema";


export class UpdateAppointmentDto extends createZodDto(UpdateAppointmentSchema) {}