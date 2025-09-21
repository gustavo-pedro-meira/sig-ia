import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/infra/database/prisma.service";
import { SignInDto } from "../dto/sign-in.dto";
import { compare } from "bcrypt";

@Injectable()
export class SignInUseCase {
    constructor(private jwtService: JwtService, private prismaService: PrismaService) {}
    async execute(signInDto: SignInDto) {
        const employee = await this.prismaService.employee.findUnique({
            where: { email: signInDto.email }
        });

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