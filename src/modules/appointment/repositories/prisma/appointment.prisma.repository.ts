// Implementação do repositório de compromissos usando Prisma
import { Injectable } from "@nestjs/common";
import { AppointmentRepository } from "../appointment.repository";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateAppointmentDto, AppointmentCreateDto } from "../../dto/create-appointment.dto";
import { UpdateAppointmentDto } from "../../dto/update-appointment.dto";

@Injectable()
export class AppointmentPrismaRepository implements AppointmentRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(userId: string): Promise<AppointmentCreateDto[] | null> {
        return await this.prismaService.appointment.findMany({
            where: { userId },
            include: { employee: true, employeeResponsible: true }
        });
    }

    async findOne(id: string): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.findUnique({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async updateById(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.update({
            where: { id },
            data: updateAppointmentDto,
            include: { employee: true, employeeResponsible: true }
        })
    }

    async deleteById(id: string): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.delete({
            where: { id },
            include: { employee: true, employeeResponsible: true }
        })
    }

    async save(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.create({
            data: createAppointmentDto,
            include: { employee: true, employeeResponsible: true }
        })
    }
}