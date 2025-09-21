import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";

@Injectable()
export class DeleteEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string) {
        return await this.employeeRepository.deleteById(id);
    }
}