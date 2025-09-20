import { Module } from '@nestjs/common';
import { EmployeeModule } from './employee/employee.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [EmployeeModule, LoginModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
