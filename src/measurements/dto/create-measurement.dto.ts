import {
  IsUUID,
  IsOptional,
  IsNumber,
  IsString,
  IsJSON,
  IsDate,
} from 'class-validator';

export class CreateMeasurementDto {
  @IsUUID()
  patientId: string; // Foreign key to Patient

  @IsUUID()
  measurementTypeId: string; // Foreign key to MeasurementType

  @IsOptional()
  @IsNumber()
  measurement_value?: number; // Numeric measurement

  @IsOptional()
  @IsString()
  measurement_value_text?: string; // Text-based measurement

  @IsOptional()
  @IsJSON()
  measurement_data?: Record<string, any>; // JSON-based measurement

  @IsOptional()
  @IsDate()
  measurement_time?: Date; // Defaults to current timestamp
}
