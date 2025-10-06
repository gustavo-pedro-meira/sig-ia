// Caso de uso para buscar todos os funcionários
import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";
import { filter } from "rxjs";
import { FilterEmployeeDto } from "../dto/filters-employee.dto";

@Injectable()
export class FindAllEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(filter: FilterEmployeeDto) {
        return await this.employeeRepository.findAll(filter);
    }
}