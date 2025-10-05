import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employee/employee.module';
import { LoginModule } from './modules/login/login.module';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { TaskModule } from './modules/task/task.module';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { PrismaService } from './infra/database/prisma.service';
import { ScheduleModule } from '@nestjs/schedule';
import { DepartmentModule } from './modules/department/department.module';

@Module({
  imports: [ScheduleModule.forRoot(), EmployeeModule, LoginModule, TaskModule, AppointmentModule, DepartmentModule],
  controllers: [],
  providers: [
    PrismaService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    }
  ],
})
export class AppModule {}
