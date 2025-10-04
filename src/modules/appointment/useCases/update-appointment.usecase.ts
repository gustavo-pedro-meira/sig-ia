// Caso de uso para atualizar um compromisso por ID
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentCreateDto } from '../dto/create-appointment.dto';
import { UpdateAppointmentDto } from '../dto/update-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class UpdateAppointmentUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async execute(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentCreateDto | null> {
        const appointment = await this.appointmentRepository.findOne(id);
        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }
        return this.appointmentRepository.updateById(id, updateAppointmentDto);
    }
}