import { Injectable, NotFoundException } from "@nestjs/common";
import { DepartmentRepository } from "../repositories/department.repository";
import { UpdateDepartmentDto } from "../dto/update-department.dto";


@Injectable()
export class UpdateDepartmentUseCase {
    constructor(private readonly departmentRepository: DepartmentRepository) {}

    async execute(id: string, updateDepartmentDto: UpdateDepartmentDto) {
        const departmenExist = await this.departmentRepository.findOne(id);

        if (!departmenExist) {
            throw new NotFoundException('Department not found');
        }

        return await this.departmentRepository.updateById(id, updateDepartmentDto);
    }
}