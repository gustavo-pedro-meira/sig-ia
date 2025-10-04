// Caso de uso para buscar um compromisso por ID
import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentCreateDto } from '../dto/create-appointment.dto';
import { AppointmentRepository } from '../repositories/appointment.repository';

@Injectable()
export class FindOneAppointmentUseCase {
  constructor(private readonly appointmentRepository: AppointmentRepository) {}

  async execute(id: string) {
    const appointment = await this.appointmentRepository.findOne(id);
    if (!appointment) {
      throw new NotFoundException('Appointment not found');
    }
    return appointment;
  }
}