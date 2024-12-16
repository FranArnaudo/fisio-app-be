import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsBoolean,
  IsDefined,
  Length,
} from 'class-validator';

export class CreateHealthcareDto {
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
    return value;
  })
  @IsDefined({ message: 'Debe ingresar un nombre para la obra social' })
  @IsString({ message: 'Debe ingresar un nombre para la obra social' })
  @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres' })
  name: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}
