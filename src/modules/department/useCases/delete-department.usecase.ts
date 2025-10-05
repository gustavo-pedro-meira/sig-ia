import { Injectable, NotFoundException } from "@nestjs/common";
import { DepartmentRepository } from "../repositories/department.repository";


@Injectable()
export class DeleteDepartmentUseCase {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    async execute(id: string) {
        const departmenExist = await this.departmentRepository.findOne(id);

        if (!departmenExist) {
            throw new NotFoundException('Department not found');
        }

        return await this.departmentRepository.deleteById(id);
    }
}