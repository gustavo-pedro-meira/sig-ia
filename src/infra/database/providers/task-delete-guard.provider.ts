import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "src/modules/task/repositories/task.repository";

/**
 * Guard para proteger exclusão de tarefas delegadas
 * 
 * Regras:
 * - Usuário só pode excluir suas próprias tarefas (onde userId === currentUserId)
 * - Usuário não pode excluir tarefas que foram delegadas a ele por superiores
 */
@Injectable()
export class TaskDeleteGuard implements CanActivate {
    constructor(private readonly taskRepository: TaskRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const currentUser = request.user;
        const taskId = request.params.id;

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

        // Se o usuário não é o criador, não pode excluir
        if (!isCreator) {
            throw new ForbiddenException('You cannot delete tasks that were delegated to you');
        }

        return true;
    }
}
