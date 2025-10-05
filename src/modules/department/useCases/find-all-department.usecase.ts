import { Injectable } from "@nestjs/common";
import { DepartmentRepository } from "../repositories/department.repository";


@Injectable()
export class FindAllDepartmentUseCase {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    async execute() {
        return await this.departmentRepository.findAll();
    }
}