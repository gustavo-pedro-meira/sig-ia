import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "src/modules/task/repositories/task.repository";
import { TaskStatus } from "generated/prisma";

/**
 * Guard para proteger atualização de tarefas delegadas
 *
 * Regras:
 * - Usuário criador pode alterar qualquer campo
 * - Usuário não criador (subordinado) só pode alterar status para Completed ou Expired
 */
@Injectable()
export class TaskUpdateGuard implements CanActivate {
    constructor(private readonly taskRepository: TaskRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const taskId = request.params.id;
        const updateData = request.body;

        if (!taskId) {
            throw new ForbiddenException('Task ID is required');
        }

        // Busca a tarefa
        const task = await this.taskRepository.findOne(taskId);

        if (!task) {
            throw new NotFoundException('Task not found');
        }

        // Verifica se o usuário é o criador da tarefa
        const isCreator = task.userId === currentUser.sub;

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
            throw new ForbiddenException('You can only update the status of tasks delegated to you');
        }

        // Verifica se o status está sendo alterado para um valor permitido
        if (updateData.status && ![TaskStatus.Completed, TaskStatus.Expired].includes(updateData.status)) {
            throw new ForbiddenException('You can only change status to Completed or Expired for delegated tasks');
        }

        return true;
    }
}