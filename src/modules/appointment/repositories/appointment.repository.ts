// Interface abstrata para repositório de compromissos
import { Injectable } from "@nestjs/common";
import { CreateAppointmentDto, AppointmentCreateDto } from "../dto/create-appointment.dto";
import { UpdateAppointmentDto } from "../dto/update-appointment.dto";

@Injectable()
export abstract class AppointmentRepository {
    abstract findAll(userId: string): Promise<AppointmentCreateDto[] | null>;
    abstract findOne(id: string): Promise<AppointmentCreateDto | null>;
    abstract updateById(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentCreateDto | null>;
    abstract deleteById(id: string): Promise<AppointmentCreateDto | null>;
    abstract save(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentCreateDto | null>;
}