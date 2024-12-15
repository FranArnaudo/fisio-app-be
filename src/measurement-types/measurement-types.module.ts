import { Module } from '@nestjs/common';
import { MeasurementTypesService } from './measurement-types.service';
import { MeasurementTypesController } from './measurement-types.controller';

@Module({
  controllers: [MeasurementTypesController],
  providers: [MeasurementTypesService],
})
export class MeasurementTypesModule {}
