import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Observable } from "rxjs";
import { TaskRepository } from "../repositories/task.repository";


@Injectable()
export class TaskDeleteGuard implements CanActivate {
    constructor(private readonly taskRepository: TaskRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean>{
        const request = context.switchToHttp().getRequest();
        const userAuth = request.user;
        const taskId = request.params.id;

        const taskExist = await this.taskRepository.findOne(taskId);
        if (!taskExist) {
            throw new NotFoundException('Task not found');
        }

        const taskCreator = taskExist.userId === userAuth.sub;
        if (!taskCreator) {
            throw new InternalServerErrorException('Only the role that created it can delete');
        }

        const taskValidateStatus = taskExist.status === "Expired" || taskExist.status === "Completed";
        if (taskValidateStatus) {
            throw new InternalServerErrorException('Tarefa esta expirada ou foi completa, assim não pode deletar')
        }

        return true;
    }
}