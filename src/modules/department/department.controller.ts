import { Body, Controller, Post } from "@nestjs/common";
import { CreateDepartmentUseCase } from "./useCases/create-department.usecase";
import { CreateDepartmentDto } from "./dto/create-department.dto";


@Controller('departments')
export class DepartmentController {
    constructor(
        private readonly createDepartmentUseCase: CreateDepartmentUseCase,
    ) {}

    @Post()
    createDepartmente(@Body() createDepartmentDto: CreateDepartmentDto) {
        return this.createDepartmentUseCase.execute(createDepartmentDto);
    }
}