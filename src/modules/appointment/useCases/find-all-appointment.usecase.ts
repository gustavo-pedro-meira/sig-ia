// Caso de uso para buscar todos os compromissos
import { Injectable } from '@nestjs/common';
import { AppointmentCreateDto } from '../dto/create-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class FindAllAppointmentUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async execute(): Promise<AppointmentCreateDto[] | null> {
        return this.appointmentRepository.findAll();
    }
}