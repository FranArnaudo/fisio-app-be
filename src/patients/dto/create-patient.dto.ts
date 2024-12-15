import { IsString, IsOptional, IsEmail, IsDate } from 'class-validator';

export class CreatePatientDto {
  @IsString({ message: 'El paciente debe tener un nombre.' })
  firstname: string;

  @IsString({ message: 'El paciente debe tener un apellido.' })
  lastname: string;

  @IsOptional()
  @IsDate()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
