import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindAllEmployeeUseCase } from "./useCases/find-all-employee.usecase";
import { FindOneEmployeeUseCase } from "./useCases/find-one-employee.usecase";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { UpdateEmployeeUseCase } from "./useCases/update-employee.usecas";
import { DeleteEmployeeUseCase } from "./useCases/delete-employee.usecase";

@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly createEmployeUseCase: CreateEmployeeUseCase,
        private readonly findAllEmployeeUseCase: FindAllEmployeeUseCase,
        private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly deletEmployeeUseCase: DeleteEmployeeUseCase,
    ) {}

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

    @Put(':id')
    updateByIdEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.updateEmployeeUseCase.execute(id, updateEmployeeDto);
    }

    @Delete(':id')
    deleteByIdEmployee(@Param('id') id: string) {
        return this.deletEmployeeUseCase.execute(id);
    }
}