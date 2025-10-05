import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { DepartmentRepository } from "../department.repository";
import { DepartmentCreateDto, CreateDepartmentDto } from "../../dto/create-department.dto";
import { UpdateDepartmentDto } from "../../dto/update-department.dto";


@Injectable()
export class DepartmentPrismaRepository implements DepartmentRepository{
    constructor(private readonly prismaService: PrismaService) {}

    async findAll(): Promise<DepartmentCreateDto[] | null> {
        return await this.prismaService.department.findMany();
    }

    async findOne(id: string): Promise<DepartmentCreateDto | null> {
        const departmentExist = await this.prismaService.department.findUnique({
            where: { id }
        })

        if (!departmentExist) {
            throw new NotFoundException('Department not found');
        }

        return await this.prismaService.department.findUnique({
            where: { id }
        })
    }

    async updateById(id: string, updateDepartmentDto: UpdateDepartmentDto): Promise<DepartmentCreateDto | null> {
        const departmenExist = await this.prismaService.department.findUnique({
            where: { id }
        })

        if (!departmenExist) {
            throw new NotFoundException('Department not found')
        }

        return await this.prismaService.department.update({
            where: { id },
            data: { ...updateDepartmentDto }
        })
    }

    async deleteById(id: string): Promise<DepartmentCreateDto | null> {
        const departmenExist = await this.prismaService.department.findUnique({
            where: { id }
        })

        if (!departmenExist) {
            throw new NotFoundException('Department not found')
        }

        return await this.prismaService.department.delete({
            where: { id }
        })
    }

    async save(createDepartmentDto: CreateDepartmentDto): Promise<DepartmentCreateDto | null> {
        return await this.prismaService.department.create({
            data: { ...createDepartmentDto }
        })
    }
}