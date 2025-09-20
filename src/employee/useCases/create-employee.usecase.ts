import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/infra/database/prisma.service";
import { CreateEmployeeDto } from "../dto/create-employee.dto";


@Injectable()
export class CreateEmployeeUseCase {
    constructor(private readonly prismaService: PrismaService) {}
    async execute(createEmployeeDto: CreateEmployeeDto) {
        const user = await this.prismaService.user.findFirst({
            where: {
                OR: [{ username: createEmployeeDto.username }, { email: createEmployeeDto.email }],
            }
        });
        if (user) {
            throw new ConflictException('Username or email already exists');
        }

        return await this.prismaService.user.create({
            createEmployeeDto,
        })
    }
}