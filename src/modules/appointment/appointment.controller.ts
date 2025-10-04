// Controlador para gerenciar compromissos/agendamentos via API REST
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateAppointmentUseCase } from "./useCases/create-appointment.usecase";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { DeleteAppointmentUseCase } from "./useCases/delete-appointment.usecase";
import { FindAllAppointmentUseCase } from "./useCases/find-all-appointment.usecase";
import { FindOneAppointmentUseCase } from "./useCases/find-one-appointment.usecase";
import { UpdateAppointmentUseCase } from "./useCases/update-appointment.usecase";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";


@Controller('appointments')
export class AppointmentController {
    constructor(
        private readonly createAppointmentUseCase: CreateAppointmentUseCase,
        private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
        private readonly findAllAppointmentUseCase: FindAllAppointmentUseCase,
        private readonly findOneAppointmentUseCase: FindOneAppointmentUseCase,
        private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    ) {}

    @Post()
    createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
        return this.createAppointmentUseCase.execute(createAppointmentDto);
    }

    @Delete(':id')
    deleteByIdAppointment(@Param('id') id: string) {
        return this.deleteAppointmentUseCase.execute(id);
    }

    @Get()
    findAllAppointments() {
        return this.findAllAppointmentUseCase.execute();
    }

    @Get(':id')
    findOneAppointment(@Param('id') id: string) {
        return this.findOneAppointmentUseCase.execute(id);
    }

    @Put(':id')
    updateByIdAppointment(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.updateAppointmentUseCase.execute(id, updateAppointmentDto);
    }
}