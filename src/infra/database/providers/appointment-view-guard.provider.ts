import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { EmployeeRepository } from "src/modules/employee/repositories/employee.repository";

/**
 * Guard para proteger visualização de compromissos
 *
 * Regras:
 * - Prefeito (Cabinet) pode ver todos os compromissos
 * - Demais usuários só podem ver seus próprios compromissos (onde userId ou userIdResponsible === currentUserId)
 */
@Injectable()
export class AppointmentViewGuard implements CanActivate {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const query = request.query;

        // Busca o funcionário atual para verificar a posição
        const employee = await this.employeeRepository.findOne(currentUser.sub);

        if (!employee) {
            throw new ForbiddenException('Employee not found');
        }

        // Se é Cabinet (Prefeito), pode ver tudo
        if (employee.position === 'Cabinet') {
            return true;
        }

        // Se não é Cabinet, só pode ver compromissos onde ele é o responsável ou criador
        // Verifica se está tentando filtrar por outro usuário
        if (query.userIdResponsible && query.userIdResponsible !== currentUser.sub) {
            throw new ForbiddenException('You can only view your own appointments');
        }

        if (query.userId && query.userId !== currentUser.sub) {
            throw new ForbiddenException('You can only view your own appointments');
        }

        return true;
    }
}
