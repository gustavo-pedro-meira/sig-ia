// Controlador para gerenciar compromissos/agendamentos via API REST
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request } from "@nestjs/common";
import { CreateAppointmentUseCase } from "./useCases/create-appointment.usecase";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { DeleteAppointmentUseCase } from "./useCases/delete-appointment.usecase";
import { FindAllAppointmentUseCase } from "./useCases/find-all-appointment.usecase";
import { FindOneAppointmentUseCase } from "./useCases/find-one-appointment.usecase";
import { UpdateAppointmentUseCase } from "./useCases/update-appointment.usecase";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AuthGuard } from "src/infra/database/providers/auth-guard.provider";


@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentController {
    constructor(
        private readonly createAppointmentUseCase: CreateAppointmentUseCase,
        private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
        private readonly findAllAppointmentUseCase: FindAllAppointmentUseCase,
        private readonly findOneAppointmentUseCase: FindOneAppointmentUseCase,
        private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
    ) {}

    @Post()
    createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
        createAppointmentDto.userId = req.user.sub;
        return this.createAppointmentUseCase.execute(createAppointmentDto);
    }

    @Delete(':id')
    deleteByIdAppointment(@Param('id') id: string) {
        return this.deleteAppointmentUseCase.execute(id);
    }

    @Get()
    findAllAppointments(@Request() req) {
        return this.findAllAppointmentUseCase.execute(req.user.sub);
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