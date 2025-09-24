import { Injectable, NotFoundException } from "@nestjs/common";
import { EmployeeRepository } from "../repositories/employee.repository";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { hash } from "bcrypt";

@Injectable()
export class UpdateEmployeeUseCase {
    constructor(private readonly employeeRepository: EmployeeRepository) {}

    async execute(id: string, updateEmployeeDto: UpdateEmployeeDto) {
        const employeeExist = await this.employeeRepository.findOne(id);

        if(!employeeExist) {
            throw new NotFoundException('Employee not found');
        }

        if(updateEmployeeDto.password) {
            updateEmployeeDto.password = await hash(updateEmployeeDto.password, 10);
        }

        return await this.employeeRepository.updateById(id, updateEmployeeDto);    }
}