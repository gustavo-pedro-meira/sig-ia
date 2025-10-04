import { Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";


@Injectable()
export class GetMeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(userId: string) {
        const employee = await this.employeeRepository.findOne(userId);
        
        if (!employee) {
            throw new NotFoundException('Funcionário não encontrado');
        }

        // Retorna os dados do usuário sem a senha
        const { password, ...employeeData } = employee;
        
        return employeeData;
    }
}
