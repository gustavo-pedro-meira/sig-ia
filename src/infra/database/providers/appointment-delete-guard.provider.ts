import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { AppointmentRepository } from "src/modules/appointment/repositories/appointment.repository";

/**
 * Guard para proteger exclusão de compromissos delegados
 *
 * Regras:
 * - Usuário só pode excluir seus próprios compromissos (onde userId === currentUserId)
 * - Usuário não pode excluir compromissos que foram delegados a ele por superiores
 */
@Injectable()
export class AppointmentDeleteGuard implements CanActivate {
    constructor(private readonly appointmentRepository: AppointmentRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const appointmentId = request.params.id;

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

        // Se o usuário não é o criador, não pode excluir
        if (!isCreator) {
            throw new ForbiddenException('You cannot delete appointments that were delegated to you');
        }

        return true;
    }
}