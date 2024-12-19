import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PatientsModule } from './patients/patients.module';
import { DatabaseModule } from './database/database.module';
import { AreasModule } from './areas/areas.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ProfessionalsModule } from './professionals/professionals.module';
import { MeasurementsModule } from './measurements/measurements.module';
import { MeasurementTypesModule } from './measurement-types/measurement-types.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CenterModule } from './center/center.module';
import { HealthcareModule } from './healthcare/healthcare.module';
import { CoveragesModule } from './coverages/coverages.module';
import { ServicesModule } from './services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    AuthModule,
    PatientsModule,
    AreasModule,
    AppointmentsModule,
    ProfessionalsModule,
    MeasurementsModule,
    MeasurementTypesModule,
    CenterModule,
    HealthcareModule,
    CoveragesModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
