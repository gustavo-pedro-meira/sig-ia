import { Module } from '@nestjs/common';
import { EmployeeModule } from './modules/employee/employee.module';
import { LoginModule } from './modules/login/login.module';

@Module({
  imports: [EmployeeModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
