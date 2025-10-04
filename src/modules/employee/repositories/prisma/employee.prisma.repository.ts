// Implementação do repositório de funcionários usando Prisma
import { PrismaService } from 'src/infra/database/prisma.service';
import { EmployeeCreateDto, CreateEmployeeDto } from '../../dto/create-employee.dto';
import { UsernameAndEmailDto } from '../../dto/username-email.dto';
import { EmployeeRepository } from '../employee.repository';
import { Injectable } from '@nestjs/common';
import { UpdateEmployeeDto } from '../../dto/update-employee.dto';

@Injectable()
export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsernameAndEmail(usernameAndEmailDto: UsernameAndEmailDto,): Promise<EmployeeCreateDto | null> {
    return await this.prismaService.employee.findFirst({
        where: {
            OR: [{username: usernameAndEmailDto.username}, {email: usernameAndEmailDto.email}]
        }
    })
  }

  async findByEmail(email: string): Promise<EmployeeCreateDto | null> {
      return await this.prismaService.employee.findUnique({
        where: {
            email,
        }
      })
  }

  async findAll(): Promise<EmployeeCreateDto[]> {
    return await this.prismaService.employee.findMany();
  }

  async findOne(id: string): Promise<EmployeeCreateDto | null> {
      return await this.prismaService.employee.findUnique({
        where: { id }
      })
  }

  async updateById(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<EmployeeCreateDto | null> {
      return await this.prismaService.employee.update({
        where: { id },
        data: {
            ...updateEmployeeDto,
        }
      })
  }

  async deleteById(id: string): Promise<EmployeeCreateDto | null> {
      return await this.prismaService.employee.delete({
        where: { id }
      })
  }

  async save(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeCreateDto | null> {
    return await this.prismaService.employee.create({
        data: createEmployeeDto,
    })
  }
}
