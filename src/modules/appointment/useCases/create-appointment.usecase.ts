// Caso de uso para criar um novo compromisso
import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto, AppointmentCreateDto } from '../dto/create-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class CreateAppointmentUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async execute(data: CreateAppointmentDto): Promise<AppointmentCreateDto | null> {
        return this.appointmentRepository.save(data);
    }
}