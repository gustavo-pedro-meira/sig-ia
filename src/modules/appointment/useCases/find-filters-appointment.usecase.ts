import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../repositories/appointment.repository";
import { FilterAppointmentDto } from "../dto/filter-appointment.sto";


@Injectable()
export class FindFiltersAppointmentUseCase {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async execute(filters: FilterAppointmentDto) {
        return await this.appointmentRepository.findFilters(filters);
    }
}