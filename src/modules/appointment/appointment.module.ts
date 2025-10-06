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

@Module({
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    DeleteAppointmentUseCase,
    FindAllAppointmentUseCase,
    FindOneAppointmentUseCase,
    UpdateAppointmentUseCase,
    FindFiltersAppointmentUseCase,
    PrismaService,
    {
      provide: AppointmentRepository,
      useClass: AppointmentPrismaRepository,
    },
  ],
})
export class AppointmentModule {}