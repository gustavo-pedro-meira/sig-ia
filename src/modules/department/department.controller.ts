import { Body, Controller, Param, Post, Put } from "@nestjs/common";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentUseCase } from "./useCases/update-department.usecase";
import { UpdateDepartmentDto } from "./dto/update-department.dto";


@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly createDepartmentUseCase: CreateDepartmentUseCase,
        private readonly updateDepartmenteUseCase: UpdateDepartmentUseCase,
    ) {}

    @Post()
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.createDepartmentUseCase.execute(createDepartmentDto);
    }

    @Put(':id')
    updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.updateDepartmenteUseCase.execute(id, updateDepartmentDto)
    }
}