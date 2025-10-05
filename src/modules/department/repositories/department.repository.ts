import { Injectable } from "@nestjs/common";
import { CreateDepartmentDto, DepartmentCreateDto } from "../dto/create-department.dto";
import { UpdateDepartmentDto } from "../dto/update-department.dto";

@Injectable()
export abstract class DepartmentRepository {
    abstract findAll(): Promise<DepartmentCreateDto[] | null>;
    abstract findOne(id: string): Promise<DepartmentCreateDto | null>;
    abstract updateById(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentCreateDto  | null>;
    abstract deleteById(id: string): Promise<DepartmentCreateDto | null>;
    abstract save(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentCreateDto | null>;
}