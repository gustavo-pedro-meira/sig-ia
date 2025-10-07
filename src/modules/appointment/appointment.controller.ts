// Controlador para gerenciar compromissos/agendamentos via API REST
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Request, Query } from "@nestjs/common";
import { CreateAppointmentUseCase } from "./useCases/create-appointment.usecase";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { DeleteAppointmentUseCase } from "./useCases/delete-appointment.usecase";
import { FindAllAppointmentUseCase } from "./useCases/find-all-appointment.usecase";
import { FindOneAppointmentUseCase } from "./useCases/find-one-appointment.usecase";
import { UpdateAppointmentUseCase } from "./useCases/update-appointment.usecase";
import { UpdateAppointmentDto } from "./dto/update-appointment.dto";
import { AuthGuard } from "src/infra/database/providers/auth-guard.provider";
import { FindFiltersAppointmentUseCase } from "./useCases/find-filters-appointment.usecase";
import { FilterAppointmentDto } from "./dto/filter-appointment.sto";
import { AppointmentDeleteGuard } from "src/infra/database/providers/appointment-delete-guard.provider";
import { AppointmentUpdateGuard } from "src/infra/database/providers/appointment-update-guard.provider";
import { AppointmentViewGuard } from "src/infra/database/providers/appointment-view-guard.provider";


@Controller('appointments')
@UseGuards(AuthGuard)
export class AppointmentController {
    constructor(
        private readonly createAppointmentUseCase: CreateAppointmentUseCase,
        private readonly deleteAppointmentUseCase: DeleteAppointmentUseCase,
        private readonly findAllAppointmentUseCase: FindAllAppointmentUseCase,
        private readonly findOneAppointmentUseCase: FindOneAppointmentUseCase,
        private readonly updateAppointmentUseCase: UpdateAppointmentUseCase,
        private readonly findFiltersAppointmentUseCase: FindFiltersAppointmentUseCase,
    ) {}

    @Post()
    createAppointment(@Body() createAppointmentDto: CreateAppointmentDto, @Request() req) {
        createAppointmentDto.userId = req.user.sub;
        return this.createAppointmentUseCase.execute(createAppointmentDto);
    }

    @Delete(':id')
    @UseGuards(AppointmentDeleteGuard)
    deleteByIdAppointment(@Param('id') id: string) {
        return this.deleteAppointmentUseCase.execute(id);
    }

    @Get('all')
    findAllAppointments(@Request() req) {
        return this.findAllAppointmentUseCase.execute(req.user.sub);
    }

    @Get(':id')
    findOneAppointment(@Param('id') id: string) {
        return this.findOneAppointmentUseCase.execute(id);
    }

    @Put(':id')
    @UseGuards(AppointmentUpdateGuard)
    updateByIdAppointment(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
        return this.updateAppointmentUseCase.execute(id, updateAppointmentDto);
    }

    // Filtragens
    @Get('')
    @UseGuards(AppointmentViewGuard)
    findFiltersAppointment(@Query() filters: FilterAppointmentDto) {
        return this.findFiltersAppointmentUseCase.execute(filters);
    }
}