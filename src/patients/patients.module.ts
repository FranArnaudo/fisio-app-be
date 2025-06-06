import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { Patient } from './entities/patient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Patient]), // Register the Patient repository
  ],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
