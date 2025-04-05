import { IsString, IsOptional, IsEmail, IsDate, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString({ message: 'El paciente debe tener un nombre.' })
  firstname: string;

  @IsString({ message: 'El paciente debe tener un apellido.' })
  lastname: string;

  @IsOptional()
  @Transform(({ value }) => {
    if (value === null || value === undefined) return undefined;
    // If already a Date object, return it
    if (value instanceof Date) return value;
    // If it's a string, try to convert it to a Date
    if (typeof value === 'string') {
      const date = new Date(value);
      // Check if the date is valid
      if (!isNaN(date.getTime())) {
        return date;
      }
    }
    // If conversion fails, return the original value
    // (validation will fail for non-date values)
    return value;
  })
  @IsDate({ message: 'La fecha de nacimiento debe ser una fecha válida.' })
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
  
  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsBoolean()
  deleted?: boolean = false
}