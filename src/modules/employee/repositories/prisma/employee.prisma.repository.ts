import { PrismaService } from 'src/infra/database/prisma.service';
import { EmployeeCreateDto, CreateEmployeeDto } from '../../dto/create-employee.dto';
import { UsernameAndEmailDto } from '../../dto/username-email.dto';
import { EmployeeRepository } from '../employee.repository';

export class EmployeePrismaRepository implements EmployeeRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findByUsernameAndEmail(usernameAndEmailDto: UsernameAndEmailDto,): Promise<EmployeeCreateDto | null> {
    return await this.prismaService.employee.findFirst({
        where: {
            OR: [{username: usernameAndEmailDto.username}, {email: usernameAndEmailDto.email}]
        }
    })
  }

  async save(createEmployeeDto: CreateEmployeeDto): Promise<EmployeeCreateDto> {
    return await this.prismaService.employee.create({
        data: createEmployeeDto,
    })
  }
}
