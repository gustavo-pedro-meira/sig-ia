import { PrismaService } from "src/infra/database/prisma.service";
import { UsernameAndEmailDto } from "../dto/username-email.dto";
import { ConflictException, Injectable } from "@nestjs/common";
import { hash } from "bcrypt";
import { CreateEmployeeDto, EmployeeCreateDto } from "../dto/create-employee.dto";

@Injectable()
export abstract class EmployeeRepository {
    abstract findByUsernameAndEmail(usernameAndEmailDto: UsernameAndEmailDto): Promise<EmployeeCreateDto | null>;
    abstract findByEmail(email: string): Promise<EmployeeCreateDto | null>;
    abstract findAll(): Promise<EmployeeCreateDto[] | null>;
    abstract findOne(id: string): Promise<EmployeeCreateDto | null>;
    abstract save(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeCreateDto>;
}