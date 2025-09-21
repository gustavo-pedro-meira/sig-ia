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

    @Get()
    findAllEmployee() {
        return this.findAllEmployeeUseCase.execute();
    }

    @Get(':id')
    findOneEmploye(@Param('id') id: string) {
        return this.findOneEmployeeUseCase.execute(id);
    }
}