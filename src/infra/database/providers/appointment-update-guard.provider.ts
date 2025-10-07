import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AppointmentRepository } from "src/modules/appointment/repositories/appointment.repository";
import { AppointmentStatus } from "generated/prisma";

/**
 * Guard para proteger atualização de compromissos delegados
 *
 * Regras:
 * - Usuário criador pode alterar qualquer campo
 * - Usuário não criador (subordinado) só pode alterar status para Closed ou Cancelled
 */
@Injectable()
export class AppointmentUpdateGuard implements CanActivate {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const appointmentId = request.params.id;
        const updateData = request.body;

        if (!appointmentId) {
            throw new ForbiddenException('Appointment ID is required');
        }

        // Busca o compromisso
        const appointment = await this.appointmentRepository.findOne(appointmentId);

        if (!appointment) {
            throw new NotFoundException('Appointment not found');
        }

        // Verifica se o usuário é o criador do compromisso
        const isCreator = appointment.userId === currentUser.sub;

        // Se é o criador, permite qualquer alteração
        if (isCreator) {
            return true;
        }

        // Se não é o criador, verifica se está tentando alterar apenas campos permitidos
        const allowedFieldsForNonCreator = ['status'];
        const requestedFields = Object.keys(updateData);

        // Verifica se está tentando alterar campos não permitidos
        const hasNonAllowedFields = requestedFields.some(field => !allowedFieldsForNonCreator.includes(field));

        if (hasNonAllowedFields) {
            throw new ForbiddenException('You can only update the status of appointments delegated to you');
        }

        // Verifica se o status está sendo alterado para um valor permitido
        if (updateData.status && ![AppointmentStatus.Closed, AppointmentStatus.Cancelled].includes(updateData.status)) {
            throw new ForbiddenException('You can only change status to Closed or Cancelled for delegated appointments');
        }

        return true;
    }
}