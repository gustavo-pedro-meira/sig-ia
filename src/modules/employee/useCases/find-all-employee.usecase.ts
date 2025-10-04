// Caso de uso para buscar todos os funcionários
import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";

@Injectable()
export class FindAllEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute() {
        return await this.employeeRepository.findAll();
    }
}