import { Body, Controller, Post } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('employees')
export class EmployeeController {
    constructor(private readonly createEmployeUseCase: CreateEmployeeUseCase) {}

    @ApiOperation({ summary: 'Create a new employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Username or email already exists.' })
    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.createEmployeUseCase.execute(createEmployeeDto);
    }
}