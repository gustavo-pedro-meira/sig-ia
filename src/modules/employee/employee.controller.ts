import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindAllEmployeeUseCase } from "./useCases/find-all-employee.usecase";
import { FindOneEmployeeUseCase } from "./useCases/find-one-employee.usecase";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { UpdateEmployeeUseCase } from "./useCases/update-employee.usecas";
import { DeleteEmployeeUseCase } from "./useCases/delete-employee.usecase";
import { CreateEmployeeSchemaDto } from "./schemas/create-employee.schema";

@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly createEmployeUseCase: CreateEmployeeUseCase,
        private readonly findAllEmployeeUseCase: FindAllEmployeeUseCase,
        private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly deletEmployeeUseCase: DeleteEmployeeUseCase,
    ) {}

    // @ApiOperation({ summary: 'Create a new employee' })
    // @ApiResponse({ status: 201, description: 'The employee has been successfully created.' })
    // @ApiResponse({ status: 409, description: 'Username or email already exists.' })
    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeSchemaDto) {
        return this.createEmployeUseCase.execute(createEmployeeDto);
    }

    // @ApiOperation({ summary: 'Retrieve a list of all employees' })
    // @ApiResponse({ status: 200, description: 'A list of employees has been successfully retrieved.' })
    // @ApiResponse({ status: 404, description: 'No employees found.' })
    @Get()
    findAllEmployee() {
        return this.findAllEmployeeUseCase.execute();
    }

    // @ApiOperation({ summary: 'Retrieve a specific employee by ID' })
    // @ApiResponse({ status: 200, description: 'The employee has been successfully retrieved.' })
    // @ApiResponse({ status: 404, description: 'Employee not found.' })
    @Get(':id')
    findOneEmploye(@Param('id') id: string) {
        return this.findOneEmployeeUseCase.execute(id);
    }

    // @ApiOperation({ summary: 'Update an existing employee by ID' })
    // @ApiResponse({ status: 200, description: 'The employee has been successfully updated.' })
    // @ApiResponse({ status: 404, description: 'Employee not found.' })
    @Put(':id')
    updateByIdEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.updateEmployeeUseCase.execute(id, updateEmployeeDto);
    }

    // @ApiOperation({ summary: 'Delete an employee by ID' })
    // @ApiResponse({ status: 200, description: 'The employee has been successfully deleted.' })
    // @ApiResponse({ status: 404, description: 'Employee not found.' })
    @Delete(':id')
    deleteByIdEmployee(@Param('id') id: string) {
        return this.deletEmployeeUseCase.execute(id);
    }
}