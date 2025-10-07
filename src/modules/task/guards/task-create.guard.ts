import { CanActivate, ExecutionContext, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { positionHierarchy } from "src/modules/employee/dto/create-employee.dto";
import { EmployeeRepository } from "src/modules/employee/repositories/employee.repository";
import { CreateTaskDto } from "src/modules/task/dto/create-task.dto";


@Injectable()
export class TaskCreateGuard implements CanActivate {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const sender = request.user;
        const createTaskDto: CreateTaskDto = request.body;

        const recipientId = createTaskDto.userIdResponsible;
        if (!recipientId) {
            return true;
        }

        const [senderEmployee, recipientEmployee] = await Promise.all([
            this.employeeRepository.findOne(sender.sub),
            this.employeeRepository.findOne(recipientId),
        ])
        if (!senderEmployee) {
            throw new NotFoundException('Sender employee not found');
        }
        if (!recipientEmployee) {
            throw new NotFoundException('Recipient employee not found');
        }

        const senderLevel = positionHierarchy[senderEmployee.position];
        const recipientLevel = positionHierarchy[recipientEmployee.position];
        if (senderLevel === undefined || recipientLevel === undefined) {
            throw new InternalServerErrorException('Invalid role configuration');
        }
        if (senderLevel < recipientLevel) {
            throw new InternalServerErrorException('Invalid role configuration');
        }

        return true;
    }
}