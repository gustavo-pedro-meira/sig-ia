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
            where: { userId }
        });
    }

    async findOne(id: string): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.findUnique({
            where: { id }
        })
    }

    async updateById(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.update({
            where: { id },
            data: updateAppointmentDto,
        })
    }

    async deleteById(id: string): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.delete({
            where: { id }
        })
    }

    async save(createAppointmentDto: CreateAppointmentDto): Promise<AppointmentCreateDto | null> {
        return await this.prismaService.appointment.create({
            data: createAppointmentDto,
        })
    }
}