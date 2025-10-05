import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { CreateDepartmentDto } from "./dto/create-department.dto";
import { UpdateDepartmentUseCase } from "./useCases/update-department.usecase";
import { UpdateDepartmentDto } from "./dto/update-department.dto";
import { FindOneDepartmentUseCase } from "./useCases/find-one-department.usecase";
import { FindAllDepartmentUseCase } from "./useCases/find-all-department.usecase";
import { DeleteDepartmentUseCase } from "./useCases/delete-department.usecase";


@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly createDepartmentUseCase: CreateDepartmentUseCase,
        private readonly updateDepartmenteUseCase: UpdateDepartmentUseCase,
        private readonly deleteDepartmentUseCase: DeleteDepartmentUseCase,
        private readonly findOneDepartmentUseCase: FindOneDepartmentUseCase,
        private readonly findAllDepartmentUseCase: FindAllDepartmentUseCase
    ) {}

    @Get()
    findAllDepartment() {
        return this.findAllDepartmentUseCase.execute();
    }

    @Get(':id')
    findOneDepartment(@Param('id') id: string) {
        return this.findOneDepartmentUseCase.execute(id);
    }

    @Post()
    createDepartment(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.createDepartmentUseCase.execute(createDepartmentDto);
    }

    @Put(':id')
    updateDepartment(@Param('id') id: string, @Body() updateDepartmentDto: UpdateDepartmentDto) {
        return this.updateDepartmenteUseCase.execute(id, updateDepartmentDto)
    }

    @Delete(':id')
    deleteDepartment(@Param('id') id: string) {
        return this.deleteDepartmentUseCase.execute(id)
    }
}