import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindAllEmployeeUseCase } from "./useCases/find-all-employee.usecase";
import { FindOneEmployeeUseCase } from "./useCases/find-one-employee.usecase";

@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly createEmployeUseCase: CreateEmployeeUseCase,
        private readonly findAllEmployeeUseCase: FindAllEmployeeUseCase,
        private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
    ) {}

    @ApiOperation({ summary: 'Create a new employee' })
    @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
    @ApiResponse({ status: 409, description: 'Username or email already exists.' })
    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.createEmployeUseCase.execute(createEmployeeDto);
    }

    @ApiOperation({ summary: 'Retrieve a list of all employees' })
    @ApiResponse({ status: 200, description: 'A list of employees has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'No employees found.' })
    @Get()
    findAllEmployee() {
        return this.findAllEmployeeUseCase.execute();
    }

    @ApiOperation({ summary: 'Retrieve a specific employee by ID' })
    @ApiResponse({ status: 200, description: 'The employee has been successfully retrieved.' })
    @ApiResponse({ status: 404, description: 'Employee not found.' })
    @Get(':id')
    findOneEmploye(@Param('id') id: string) {
        return this.findOneEmployeeUseCase.execute(id);
    }
}