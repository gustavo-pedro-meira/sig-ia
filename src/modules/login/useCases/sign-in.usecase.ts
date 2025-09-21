import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma.service";
import { SignInDto } from "../dto/sign-in.dto";
import { compare } from "bcrypt";
import { EmployeeRepository } from "src/modules/employee/repositories/employee.repository";

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService, private employeeRepository: EmployeeRepository) {}
    async execute(signInDto: SignInDto) {
        const employee = await this.employeeRepository.findByEmail(
            signInDto.email
        );

        if (!employee) {
            throw new UnauthorizedException();
        }

        const passwordValidation = await compare(signInDto.password, employee.password);
        if (!passwordValidation) {
            throw new UnauthorizedException();
        }
        const payload = {sub: employee.id, email: employee.email}
        const token = await this.jwtService.signAsync(payload);
        return {
            access_token: token,
        }
    }
}