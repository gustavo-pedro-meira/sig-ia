import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { hash } from "bcrypt";


@Injectable()
export class CreateEmployeeUseCase {
    constructor(private readonly prismaService: PrismaService) {}
    async execute(createEmployeeDto: CreateEmployeeDto) {
        const user = await this.prismaService.employee.findFirst({
            where: {
                OR: [{ username: createEmployeeDto.username }, { email: createEmployeeDto.email }],
            }
        });
        if (user) {
            throw new ConflictException('Username or email already exists');
        }

        const passwordHashed = await hash(createEmployeeDto.password, 10);

        return await this.prismaService.employee.create({
            data: {
                ...createEmployeeDto,
                password: passwordHashed,
            }
        })
    }
}