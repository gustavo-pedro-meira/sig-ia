// Módulo de compromissos, configura controladores e provedores para CRUD
import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { CreateAppointmentUseCase } from './useCases/create-appointment.usecase';
import { DeleteAppointmentUseCase } from './useCases/delete-appointment.usecase';
import { FindAllAppointmentUseCase } from './useCases/find-all-appointment.usecase';
import { FindOneAppointmentUseCase } from './useCases/find-one-appointment.usecase';
import { UpdateAppointmentUseCase } from './useCases/update-appointment.usecase';
import { AppointmentPrismaRepository } from './repositories/prisma/appointment.prisma.repository';
import { AppointmentRepository } from './repositories/appointment.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { FindFiltersAppointmentUseCase } from './useCases/find-filters-appointment.usecase';
import { AppointmentDeleteGuard } from 'src/infra/database/providers/appointment-delete-guard.provider';
import { AppointmentUpdateGuard } from 'src/infra/database/providers/appointment-update-guard.provider';
import { AppointmentViewGuard } from 'src/infra/database/providers/appointment-view-guard.provider';
import { EmployeeRepository } from '../employee/repositories/employee.repository';
import { EmployeePrismaRepository } from '../employee/repositories/prisma/employee.prisma.repository';

@Module({
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    DeleteAppointmentUseCase,
    FindAllAppointmentUseCase,
    FindOneAppointmentUseCase,
    UpdateAppointmentUseCase,
    FindFiltersAppointmentUseCase,
    AppointmentDeleteGuard,
    AppointmentUpdateGuard,
    AppointmentViewGuard,
    PrismaService,
    {
      provide: AppointmentRepository,
      useClass: AppointmentPrismaRepository,
    },
    {
      provide: EmployeeRepository,
      useClass: EmployeePrismaRepository,
    },
  ],
})
export class AppointmentModule {}