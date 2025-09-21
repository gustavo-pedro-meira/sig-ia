import { Injectable } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";


@Injectable()
export class FindOneEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string) {
        return await this.employeeRepository.findOne(id);
    }
}