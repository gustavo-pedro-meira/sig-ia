import { ConflictException, Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from '../dto/create-employee.dto';
import { hash } from 'bcrypt';
import { EmployeeRepository } from '../repositories/employee.repository';
import { CreateEmployeeSchemaDto } from '../schemas/create-employee.schema';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(createEmployeeDto: CreateEmployeeDto) {
    const user = await this.employeeRepository.findByUsernameAndEmail({
      username: createEmployeeDto.username,
      email: createEmployeeDto.email,
    });
    if (user) {
      throw new ConflictException('Username or email already exists');
    }

    const passwordHashed = await hash(createEmployeeDto.password, 10);

    return await this.employeeRepository.save({
      ...createEmployeeDto,
      password: passwordHashed,
    });
  }
}
