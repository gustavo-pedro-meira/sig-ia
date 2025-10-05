import { Injectable } from "@nestjs/common";
import { DepartmentRepository } from "../repositories/department.repository";
import { CreateDepartmentDto } from "../dto/create-department.dto";


@Injectable()
export class CreateDepartmentUseCase {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    async execute(createDepartmentDto: CreateDepartmentDto) {
        return await this.departmentRepository.save(createDepartmentDto);
    }
}