import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";

@Injectable()
export class UpdateEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        return await this.employeeRepository.updateById(id, updateEmployeeDto);
    }
}