import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsDateString,
  IsArray,
  IsDefined,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class EntityReference {
  @IsString()
  id: string;
}

export class CreateOrderDto {
  @IsOptional()
  @IsString()
  url?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  status?: string = 'Generada';
  
  @IsOptional()
  @IsDateString()
  submittedAt?: string;

  @IsDefined({ message: 'El paciente es obligatorio' })
  @Transform(({ value }) => ({ id: value }))
  patient: { id: string };

  @IsDefined({ message: 'La obra social es obligatoria' })
  @Transform(({ value }) => ({ id: value }))
  healthcare: { id: string };

  @IsDefined({ message: 'El servicio es obligatorio' })
  @Transform(({ value }) => ({ id: value }))
  service: { id: string };

  @IsOptional()
  @Transform(({ value }) => ({ id: value }))
  area?: { id: string };

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EntityReference)
  appointmentIds?: EntityReference[];

  @IsOptional()
  @IsDateString()
  expiresAt?: string;
}