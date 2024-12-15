import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateMeasurementTypeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  normal_min_value?: number;

  @IsOptional()
  @IsNumber()
  normal_max_value?: number;

  @IsOptional()
  @IsString()
  data_type?: string; // e.g., 'numeric', 'text', 'jsonb'

  @IsUUID()
  areaId: string; // Foreign key to Area
}
