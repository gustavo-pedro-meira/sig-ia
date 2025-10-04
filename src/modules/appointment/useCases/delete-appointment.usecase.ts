// Caso de uso para deletar um compromisso por ID
import { Injectable } from '@nestjs/common';
import { AppointmentCreateDto } from '../dto/create-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class DeleteAppointmentUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async execute(id: string): Promise<AppointmentCreateDto | null> {
        return this.appointmentRepository.deleteById(id);
    }
}