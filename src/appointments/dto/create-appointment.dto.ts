import {
  IsDateString,
  IsString,
  IsOptional,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateAppointmentDto {
  @IsDateString(
    {},
    {
      message:
        'La fecha del turno debe estar en formato ISO 8601 (AAAA-MM-DDTHH:mm:ssZ).',
    },
  )
  @IsNotEmpty({ message: 'La fecha del turno es obligatoria.' })
  appointmentDatetime: string; // ISO 8601 date string

  @IsString({ message: 'El estado debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El estado del turno es obligatorio.' })
  status: string; // e.g., "scheduled"

  @IsOptional()
  @IsString({ message: 'Las notas deben ser una cadena de texto.' })
  notes?: string; // Optional notes

  @IsOptional()
  @IsNumber({}, { message: 'La duración debe ser un número.' })
  duration?: number;
}
