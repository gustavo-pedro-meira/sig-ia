import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '../repositories/employee.repository';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(id: string) {
    const employeeExist = await this.employeeRepository.findOne(id);

    if (!employeeExist) {
      throw new NotFoundException('Employee not found');
    }

    return await this.employeeRepository.deleteById(id);
  }
}
