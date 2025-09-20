import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly createEmployeUseCase: CreateEmployeeUseCase) {}

    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.createEmployeUseCase.execute(createEmployeeDto);
    }
}