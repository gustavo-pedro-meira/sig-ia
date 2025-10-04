import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from "@nestjs/common";
import { CreateEmployeeUseCase } from "./useCases/create-employee.usecase";
import { CreateEmployeeDto } from "./dto/create-employee.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { FindAllEmployeeUseCase } from "./useCases/find-all-employee.usecase";
import { FindOneEmployeeUseCase } from "./useCases/find-one-employee.usecase";
import { UpdateEmployeeDto } from "./dto/update-employee.dto";
import { UpdateEmployeeUseCase } from "./useCases/update-employee.usecas";
import { DeleteEmployeeUseCase } from "./useCases/delete-employee.usecase";
import { AuthGuard } from "src/infra/database/providers/auth-guard.provider";
import { GetMeUseCase } from "./useCases/get-me.usecase";

@Controller('employees')
export class EmployeeController {
    constructor(
        private readonly createEmployeUseCase: CreateEmployeeUseCase,
        private readonly findAllEmployeeUseCase: FindAllEmployeeUseCase,
        private readonly findOneEmployeeUseCase: FindOneEmployeeUseCase,
        private readonly updateEmployeeUseCase: UpdateEmployeeUseCase,
        private readonly deletEmployeeUseCase: DeleteEmployeeUseCase,
        private readonly getMeUseCase: GetMeUseCase,
    ) {}

    @Post()
    createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
        return this.createEmployeUseCase.execute(createEmployeeDto);
    }

    @Get()
    // @UseGuards(AuthGuard)
    findAllEmployee() {
        return this.findAllEmployeeUseCase.execute();
    }

    @ApiOperation({ summary: 'Get current logged user information' })
    @ApiResponse({ status: 200, description: 'Returns the current logged user data including name, email, cargo, etc.' })
    @ApiResponse({ status: 401, description: 'Unauthorized. Invalid or missing token.' })
    @Get('me')
    @UseGuards(AuthGuard)
    getMe(@Req() request: any) {
        const userId = request.user.sub;
        return this.getMeUseCase.execute(userId);
    }

    @Get(':id')
    // @UseGuards(AuthGuard)
    findOneEmploye(@Param('id') id: string) {
        return this.findOneEmployeeUseCase.execute(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard)
    updateByIdEmployee(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
        return this.updateEmployeeUseCase.execute(id, updateEmployeeDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteByIdEmployee(@Param('id') id: string) {
        return this.deletEmployeeUseCase.execute(id);
    }
}